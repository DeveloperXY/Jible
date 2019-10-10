const express = require("express");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);
const mongo = require("./mongo");
const jwt = require("jsonwebtoken");
const User = mongo.User;
const Skhera = mongo.Skhera;
const Address = mongo.Address;
const RiderNotification = mongo.RiderNotification;
const ClientNotification = mongo.ClientNotification;
const RiderLocation = mongo.RiderLocation;
const googleMapsClient = require("@google/maps").createClient({
  key: "AIzaSyDd3dI_tqR6Rx-IMpS9r5mWCP5oAEibiE0"
});

const facebookAppSecret = "a28bb3ecd8bf1b13c337f91c31cd9d26";
const facebookAppId = "2375768049184396";

var consumerSockets = [];
var riderSockets = [];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const port = 9000;

io.on("connection", client => {
  var userId = client.request._query["userId"];
  var userType = client.request._query["userType"];
  console.log(`New connection - type: ${userType}`);

  if (userType === "rider") {
    const index = riderSockets.findIndex(rs => rs.userId === userId);
    if (index !== -1) {
      riderSockets[index] = {
        userId,
        socket: client
      };
    } else {
      riderSockets.push({
        userId,
        socket: client
      });
    }
    client.on("toggleAvailability", data => {
      User.findByIdAndUpdate(
        userId,
        { isAvailable: data.availability },
        { new: true },
        (error, user) => {
          if (error) {
            client.emit("toggleAvailabilityError");
            return;
          }

          if (user) {
            client.emit("toggleAvailabilitySuccess");
          } else {
            client.emit("toggleAvailabilityError");
          }
        }
      );
    });
    client.on("currentLocationUpdate", location => {
      RiderLocation.updateOne(
        { riderId: userId },
        {
          $set: {
            riderId: userId,
            lat: location.lat,
            lng: location.lng
          }
        },
        {
          upsert: true,
          setDefaultsOnInsert: true
        },
        (err, result) => {
          if (err) {
            console.log("Failed to save rider result: " + err);
            return;
          }

          if (result) {
            Skhera.update(
              { riderId: userId },
              {
                $set: {
                  currentRiderLocation: {
                    lat: location.lat,
                    lng: location.lng
                  }
                }
              },
              (err, skhera) => {
                if (err) {
                  console.log("Failed to save rider location: " + err);
                  return;
                }
              }
            );
          } else {
            console.log("Unknown error while trying to save rider location");
          }
        }
      );
    });
    client.on("acceptNewAssignment", data => {
      const skheraId = data.skheraId;
      const riderId = data.riderId;
      acceptSkhera(skheraId, riderId, client);
    });
    client.on("skheraItemReady", data => {
      const itemId = data.itemId;
      const skheraId = data.skheraId;
      const isReady = data.isReady;
      const price = data.price;

      const query = {
        _id: skheraId,
        "items._id": itemId
      };

      const update = {
        $set: {
          "items.$.isReady": isReady,
          "items.$.price": price
        },
        $inc: { actualPrice: price }
      };

      // update the document
      Skhera.updateOne(query, update, function(error, result) {
        if (error) {
          console.log(error);
        } else {
          client.emit("skheraItemReadyResponse", result);
        }
      });
    });
    client.on("skheraPickedUp", data => {
      const skheraId = data.skheraId;
      Skhera.updateOne(
        { _id: skheraId },
        { $set: { status: "ORDER_PICKED_UP" } },
        function(error, result) {
          if (error) {
            console.log(error);
          } else {
            client.emit("skheraPickedUpSuccess", result);
          }
        }
      );
    });
    client.on("skheraDelivered", data => {
      const skheraId = data.skheraId;
      const riderId = data.riderId;
      Skhera.updateOne(
        { _id: skheraId },
        { $set: { status: "ORDER_DELIVERED" } },
        function(error, result) {
          if (error) {
            console.log(error);
          } else {
            User.findOneAndUpdate(
              { _id: riderId },
              { $set: { currentSkheraId: null } },
              function(error, result) {
                if (error) {
                  console.log(error);
                } else {
                  client.emit("skheraDeliveredSuccess", result);

                  Skhera.findOne({ _id: skheraId }, (err, skhera) => {
                    if (err) {
                      console.log(console.error(err));
                      return;
                    }
                    if (skhera) {
                      const clientId = skhera.clientId;
                      const socket = getSocketByClientId(clientId);

                      new ClientNotification({
                        skheraId,
                        userId: clientId,
                        type: "ORDER_DELIVERED",
                        rider: result
                      }).save((err, result) => {
                        if (err) {
                          console.log(console.error(err));
                          return;
                        }

                        if (result) {
                          if (socket) {
                            socket.emit("newNotification", {
                              type: "ORDER_DELIVERED",
                              skheraId,
                              rider: result
                            });
                          }
                        }
                      });
                    }
                  });
                }
              }
            );
          }
        }
      );
    });
    client.on("disconnect", () => {
      riderSockets = riderSockets.filter(s => s.userId !== userId);
    });
  } else if (userType === "consumer") {
    console.log("A consumer has connected: " + userId);
    const index = consumerSockets.findIndex(cs => cs.userId === userId);
    if (index !== -1) {
      consumerSockets[index] = {
        userId,
        socket: client
      };
    } else {
      consumerSockets.push({
        userId,
        socket: client
      });
    }
  }
});

function acceptSkhera(skheraId, riderId, socket) {
  Skhera.findById(skheraId, (err, skhera) => {
    if (err) {
      console.log(console.error(err));
      return;
    }

    if (skhera.status === "ORDER_RECEIVED") {
      RiderLocation.findOne({ riderId }, (err, riderLocation) => {
        Skhera.updateOne(
          { _id: skheraId },
          {
            $set: {
              riderId: riderId,
              status: "ON_THE_WAY",
              initialRiderLocation: {
                lat: riderLocation.lat,
                lng: riderLocation.lng
              },
              currentRiderLocation: {
                lat: riderLocation.lat,
                lng: riderLocation.lng
              }
            }
          },
          (err, newSkhera) => {
            if (err) {
              console.log("Failed to save skhera info: " + err);
              return;
            }

            if (newSkhera) {
              User.findOne({ _id: riderId }, (err, rider) => {
                if (rider.currentSkheraId == null) {
                  User.updateOne(
                    { _id: riderId },
                    {
                      $set: {
                        riderId: riderId,
                        currentSkheraId: skheraId
                      }
                    },
                    (err, newRider) => {
                      if (err) {
                        console.log("Failed to set rider's current skhera");
                        return;
                      }

                      console.log("Skhera assigned.");
                    }
                  );
                }
              });
            } else {
              console.log(
                "Unknown error while trying to assign skhera to rider"
              );
            }
          }
        );
        socket.emit("acceptSkheraResponse", { status: "ok" });
      });
    } else {
      // Skhera was already assigned to someone else
      socket.emit("acceptSkheraResponse", { status: "already_assigned" });
    }
  });
}

app.get("/", (req, res) => res.send("Hello World"));

app.post("/signup", async (req, res) => {
  let userType = req.body.userType;
  let code = req.body.code;
  let redirectUri = req.body.redirectUri;
  let query = `https://graph.facebook.com/v4.0/oauth/access_token?client_id=${facebookAppId}&redirect_uri=${redirectUri}&client_secret=${facebookAppSecret}&code=${code}`;

  try {
    const data = await fetch(query);
    const body = await data.json();
    const response = await fetch(
      `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${body.access_token}`
    );
    const profile = await response.json();
    const user = await User.findOne({ facebookId: profile.id });

    if (user) return res.send({ status: "email_already_exists" });
    else {
      const newUser = await new User({
        facebookId: profile.id,
        name: profile.name,
        email: profile.email,
        image: profile.picture.data.url,
        userType
      }).save();
      const token = jwt.sign({ id: newUser._id }, "fezgrejgoiregore");
      return res.send({ status: "ok", token, user: newUser });
    }
  } catch (e) {
    return res.send(e);
  }
});

async function auth(req, res, next) {
  const token = req.header("auth-token");
  if (!token) {
    return res.send({ status: "jwt_token_required" });
  }

  try {
    const data = jwt.verify(token, "fezgrejgoiregore");
    if (data.id) req.user = await User.findById(data.id);
    else return res.send({ status: "invalid_jwt_token" });

    next();
  } catch (err) {
    console.log(err);
    next();
  }
}

app.post("/login", async (req, res) => {
  let code = req.body.code;
  let redirectUri = req.body.redirectUri;
  let query = `https://graph.facebook.com/v4.0/oauth/access_token?client_id=${facebookAppId}&redirect_uri=${redirectUri}&client_secret=${facebookAppSecret}&code=${code}`;

  try {
    const data = await fetch(query);
    const body = await data.json();
    const response = await fetch(
      `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${body.access_token}`
    );
    const profile = await response.json();
    const user = await User.findOne({ facebookId: profile.id });

    if (user) {
      const token = jwt.sign({ id: user._id }, "fezgrejgoiregore");
      return res
        .header("auth-token", token)
        .send({ status: "ok", token, user });
    } else {
      return res.send({ status: "no_such_user" });
    }
  } catch (e) {
    return res.send(e);
  }
});

app.post("/verify", auth, async (req, res) => {
  if (req.user) return res.send({ status: "valid_token", user: req.user });
  return res.send({ status: "invalid_token" });
});

app.put("/user", (req, res) => {
  let _id = req.body._id;

  User.findByIdAndUpdate(_id, req.body, { new: true }, (error, user) => {
    if (error) {
      return res.json({ status: "error", message: console.error(error) });
    }

    if (user) {
      console.log("Phone: " + req.body.phone);
      return res.json({
        status: "ok",
        user
      });
    } else {
      return res.send({ status: "no_such_user" });
    }
  });
});

app.put("/rating", (req, res) => {
  let _id = req.body.skheraId;
  let rating = req.body.rating;

  Skhera.findByIdAndUpdate(_id, { rating }, (error, skhera) => {
    if (error) {
      return res.json({ status: "error", message: console.error(error) });
    }

    if (skhera) {
      return res.json({
        status: "ok",
        skhera
      });
    } else {
      return res.send({ status: "update_failed" });
    }
  });
});

app.post("/skhera", (req, res) => {
  let id = req.body.id;
  let description = req.body.description;
  let items = req.body.items.map(item => ({
    name: item
  }));
  let price = req.body.price;
  let fromAddress = req.body.fromAddress;
  let toAddress = req.body.toAddress;
  let timeAndDistance = req.body.timeAndDistance;
  let distanceValue = req.body.distanceValue;

  new Skhera({
    clientId: id,
    price,
    fromAddress,
    toAddress,
    description,
    timeAndDistance,
    distanceValue,
    items
  }).save((err, skhera) => {
    if (err) return res.send({ status: "error", message: console.error(err) });
    if (skhera) {
      setTimeout(() => {
        assignSkheraToRider(skhera);
      }, 5000);
      return res.send({
        status: "ok",
        skhera
      });
    } else {
      return res.send({ status: "unknown_error" });
    }
  });
});

function assignSkheraToRider(skhera) {
  User.find(
    { isAvailable: true, userType: "rider" },
    (err, availableRiders) => {
      if (err) console.log(console.error(err));
      const availableRiderIds = availableRiders.map(l => l._id.toString());

      function isInArray(value, array) {
        return array.indexOf(value) > -1;
      }

      RiderLocation.find({}, (err, riderLocations) => {
        if (err) console.log(console.error(err));
        const locations = riderLocations
          .filter(l => isInArray(l.riderId, availableRiderIds))
          .map(l => {
            return {
              lat: l.lat,
              lng: l.lng
            };
          });

        googleMapsClient.distanceMatrix(
          {
            origins: locations,
            destinations: [
              { lat: skhera.fromAddress.lat, lng: skhera.fromAddress.lng }
            ]
          },
          (err, data) => {
            if (err) {
              console.log(console.error(err));
              return;
            }

            const rows = [...data.json.rows];
            const results = rows.map((row, index) => {
              const distance = row.elements[0].distance;
              const duration = row.elements[0].duration;

              return {
                riderId: riderLocations[index].riderId,
                distanceText: distance.text,
                distanceValue: distance.value,
                durationText: duration.text,
                durationValue: duration.value
              };
            });

            const sortedResults = results.sort(
              (r1, r2) => r1.distanceValue - r2.distanceValue
            );

            User.findById(skhera.clientId, (err, user) => {
              if (err) console.log(console.error(err));
              emitSkheraToRiders(sortedResults, skhera._id, user);
            });
          }
        );
      });
    }
  );
}

function getSocketByRiderId(riderId) {
  const socket = riderSockets.find(rs => rs.userId === riderId);
  if (socket) return socket.socket;
  return undefined;
}

function getSocketByClientId(clientId) {
  const socket = consumerSockets.find(cs => cs.userId === clientId);
  if (socket) return socket.socket;
  return undefined;
}

function emitSkheraToRiders(sortedResults, skheraId, fromUser) {
  Skhera.findById(skheraId, (err, skhera) => {
    if (err) {
      console.log(console.error(err));
      return;
    }

    if (!["ON_THE_WAY", "ORDER_PICKED_UP"].includes(skhera.status)) {
      const riderId = sortedResults.shift().riderId;
      const socket = getSocketByRiderId(riderId);

      new RiderNotification({ riderId, skhera }).save((err, result) => {
        if (err) {
          console.log(console.error(err));
          return;
        }

        if (result) {
          if (socket) {
            socket.emit("newNotification", {
              type: "NEW_ASSIGNMENT",
              skhera: skhera._doc
            });
            setTimeout(() => {
              // If there are still riders to notify, proceed
              if (sortedResults.length > 0)
                emitSkheraToRiders(sortedResults, skhera, fromUser);
            }, 5000);
          } else {
            // If there are still riders to notify, proceed without a timeout
            if (sortedResults.length > 0)
              emitSkheraToRiders(sortedResults, skhera, fromUser);
          }
        }
      });
    }
  });
}

app.get("/riderNotifications", (req, res) => {
  const riderId = req.query.riderId;

  RiderNotification.find({ riderId }, (err, notifications) => {
    if (err) return res.send({ status: "error", message: console.error(err) });
    return res.send(notifications);
  });
});

app.get("/clientNotifications", (req, res) => {
  const clientId = req.query.clientId;

  ClientNotification.find({ userId: clientId }, (err, notifications) => {
    if (err) return res.send({ status: "error", message: console.error(err) });
    return res.send(notifications);
  });
});

app.delete("/notifications", (req, res) => {
  const notificationId = req.body.notificationId;

  RiderNotification.remove({ _id: notificationId }, (err, result) => {
    if (err) return res.send({ status: "error", message: console.error(err) });
    return res.send({ status: "ok", data: result });
  });
});

app.get("/skheras", (req, res) => {
  const clientId = req.query.clientId;

  Skhera.find({ clientId })
    .populate("riderId")
    .exec((err, skheras) => {
      if (err)
        return res.send({ status: "error", message: console.error(err) });
      return res.send(skheras);
    });
});

app.get("/skhera", (req, res) => {
  const skheraId = req.query.skheraId;

  Skhera.findOne({ _id: skheraId }, (err, skhera) => {
    if (err) return res.send({ status: "error", message: console.error(err) });
    if (skhera) {
      User.findOne({ _id: skhera.clientId }, (err, client) => {
        if (err)
          return res.send({ status: "error", message: console.error(err) });
        if (client) {
          return res.send({
            skhera: skhera,
            client: client
          });
        }
      });
    }
  });
});

app.post("/address", (req, res) => {
  let placeId = req.body.placeId;
  let userId = req.body.userId;
  let name = req.body.name;
  let lat = req.body.lat;
  let lng = req.body.lng;

  new Address({
    placeId,
    userId,
    name,
    lat,
    lng
  }).save((err, address) => {
    if (err) return res.send({ status: "error", message: console.error(err) });
    if (address) {
      return res.send({
        status: "ok",
        address
      });
    } else {
      return res.send({ status: "unknown_error" });
    }
  });
});

app.get("/address", (req, res) => {
  const userId = req.query.userId;

  Address.find({ userId }, (err, addresses) => {
    if (err) return res.send({ status: "error", message: console.error(err) });
    return res.send(addresses);
  });
});

app.delete("/address", (req, res) => {
  let _id = req.body._id;

  Address.findOneAndDelete(_id, (error, address) => {
    if (error) {
      return res.json({ status: "error", message: console.error(error) });
    }

    if (address) {
      return res.json({
        status: "ok",
        address
      });
    } else {
      return res.send({ status: "no_such_address" });
    }
  });
});

app.get("/itinerary", (req, res) => {
  const riderId = req.query.riderId;

  // Get the skheras assigned to this rider & that are yet to be delivered or picked up
  Skhera.find(
    { riderId, status: { $ne: "ORDER_DELIVERED" } },
    (err, skheras) => {
      if (err)
        return res.send({ status: "error", message: console.error(err) });
      if (skheras) {
        User.findOne({ _id: riderId }, (err, rider) => {
          if (err)
            return res.send({ status: "error", message: console.error(err) });

          RiderLocation.findOne({ riderId }, (err, riderLocation) => {
            return res.send({
              riderLocation,
              points: [].concat.apply(
                [],
                skheras.map(skhera => {
                  return [
                    {
                      skheraId: skhera._id.toString(),
                      type: "pick-up",
                      name: skhera.fromAddress.name,
                      lat: skhera.fromAddress.lat,
                      lng: skhera.fromAddress.lng,
                      isActive:
                        skhera.status === "ON_THE_WAY" &&
                        rider.currentSkheraId === skhera._id.toString()
                    },
                    {
                      skheraId: skhera._id.toString(),
                      type: "drop-off",
                      name: skhera.toAddress.name,
                      lat: skhera.toAddress.lat,
                      lng: skhera.toAddress.lng,
                      isActive:
                        skhera.status === "ORDER_PICKED_UP" &&
                        rider.currentSkheraId === skhera._id.toString()
                    }
                  ];
                })
              ),
              mapData: (skheras.length > 0
                ? [
                    {
                      type: "STARTING_POINT",
                      lat: skheras[0].initialRiderLocation.lat,
                      lng: skheras[0].initialRiderLocation.lng
                    }
                  ]
                : []
              ).concat(
                [].concat.apply(
                  [],
                  skheras.map(skhera => [
                    {
                      type: "PICK_UP_POINT",
                      lat: skhera.fromAddress.lat,
                      lng: skhera.fromAddress.lng
                    },
                    {
                      type: "DROP_OFF_POINT",
                      lat: skhera.toAddress.lat,
                      lng: skhera.toAddress.lng
                    }
                  ])
                )
              )
            });
          });
        });
      } else return res.send([]);
    }
  );
});

server.listen(port, () => console.log(`Example app listening on port ${port}`));
