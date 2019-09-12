const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const mongo = require("./mongo");
const User = mongo.User;
const Skhera = mongo.Skhera;
const Address = mongo.Address;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const port = 9000;

app.get("/", (req, res) => res.send("Hello World"));

app.post("/signup", (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let image = req.body.image;
  let userType = req.body.userType;

  User.findOne({ email }, (error, user) => {
    if (error) {
      console.log(error);
      res.send({ status: "error", message: console.error(error) });
    }
    if (user) {
      res.send({
        status: "email_already_exists"
      });
    } else {
      new User({
        name,
        email,
        image,
        userType
      }).save((err, user) => {
        console.log(err);
        if (error) res.send({ status: "error", message: console.error(error) });
        else res.send({ status: "ok", user });
      });
    }
  });
});

app.post("/login", (req, res) => {
  let email = req.body.email;

  User.findOne({ email }, (error, user) => {
    if (error) res.send({ status: "error", message: console.error(error) });
    if (user) {
      console.log(user);
      res.send({
        status: "ok",
        user
      });
    } else {
      res.send({ status: "no_such_user" });
    }
  });
});

app.put("/user", (req, res) => {
  let _id = req.body._id;
  console.log("ID: " + _id);

  User.findByIdAndUpdate(_id, req.body, { new: true }, (error, user) => {
    if (error) {
      res.json({ status: "error", message: console.error(error) });
      return;
    }

    if (user) {
      console.log("Phone: " + req.body.phone);
      res.json({
        status: "ok",
        user
      });
    } else {
      res.send({ status: "no_such_user" });
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
    if (err) res.send({ status: "error", message: console.error(err) });
    if (skhera) {
      console.log(skhera);
      res.send({
        status: "ok",
        skhera
      });
    } else {
      res.send({ status: "unknown_error" });
    }
  });
});

app.get("/skhera", (req, res) => {
  const clientId = req.query.clientId;

  Skhera.find({ clientId }, (err, skheras) => {
    if (err) res.send({ status: "error", message: console.error(err) });
    res.send(skheras);
  });
});

app.post("/address", (req, res) => {
  let id = req.body.id;
  let placeId = req.body.placeId;
  let name = req.body.name;
  let lat = req.body.lat;
  let lng = req.body.lng;

  new Address({
    id,
    placeId,
    name,
    lat,
    lng
  }).save((err, address) => {
    if (err) res.send({ status: "error", message: console.error(err) });
    if (address) {
      console.log(address);
      res.send({
        status: "ok",
        address
      });
    } else {
      res.send({ status: "unknown_error" });
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
