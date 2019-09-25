const express = require("express");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")();
const mongo = require("./mongo");
const jwt = require("jsonwebtoken");
const User = mongo.User;
const Skhera = mongo.Skhera;
const Address = mongo.Address;
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

  if (userType === "rider") {
    console.log("A rider has connected: " + userId);
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
      console.log("toggle availability request: " + data.availability);
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
      console.log(`Rider ${userId} is at (${location.lat}, ${location.lng})`);
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
        (err, location) => {
          if (err) {
            console.log("Failed to save rider location: " + err);
            return;
          }

          if (location) {
            console.log("Rider location saved");
          } else {
            console.log("Unknown error while trying to save rider location");
          }
        }
      );
    });
    client.on("disconnect", () => {
      riderSockets = riderSockets.filter(s => s.userId !== userId);
      console.log("A rider has disconnected: " + userId);
    });
  } else if (userType === "consumer") {
    console.log("A consumer has connected: " + userId);
  }
});
io.listen(5000);

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
    console.log(token);
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
  console.log("ID: " + _id);

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

app.post("/skhera", (req, res) => {
  let id = req.body.id;
  let description = req.body.description;
  let items = req.body.items.map(item => ({
    name: item
  }));
  let price = req.body.price;
  let fromAddress = req.body.fromAddress;
  let toAddress = req.body.toAddress;

  new Skhera({
    clientId: id,
    price,
    fromAddress,
    toAddress,
    description,
    items
  }).save((err, skhera) => {
    if (err) return res.send({ status: "error", message: console.error(err) });
    if (skhera) {
      console.log(skhera);
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
  RiderLocation.find({}, (err, riderLocations) => {
    if (err) console.log(console.error(err));
    const locations = riderLocations.map(l => {
      return {
        lat: l.lat,
        lng: l.lng
      };
    });

    console.log(locations);

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
        // console.log(JSON.stringify(data, null, 4));
        console.log("RiderSockets count: " + riderSockets.length);
        const results = data.json.rows.map((row, index) => {
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

        const [bestResult] = results.sort(
          (r1, r2) => r1.distanceValue - r2.distanceValue
        );
        console.log("The closest rider is: " + bestResult.riderId);
        const rs = riderSockets.find(rs => rs.userId === bestResult.riderId);
        console.log("rs: " + riderSockets[0].userId);

        Skhera.findById(skhera._id, (err, skhera) => {
          if (err) console.log(console.error(err));

          User.findById(skhera.clientId, (err, user) => {
            if (err) console.log(console.error(err));

            rs.socket.emit("newAssignment", {
              type: "NEW_ASSIGNMENT",
              skheraId: skhera._id,
              fromUserName: user.name
            });
          });
        });
      }
    );
  });
}

app.get("/skhera", (req, res) => {
  const clientId = req.query.clientId;

  Skhera.find({ clientId }, (err, skheras) => {
    if (err) return res.send({ status: "error", message: console.error(err) });
    return res.send(skheras);
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
  console.log("ID: " + _id);

  Address.findOneAndDelete(_id, (error, address) => {
    if (error) {
      return res.json({ status: "error", message: console.error(error) });
      return;
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

app.listen(port, () => console.log(`Example app listening on port ${port}`));
