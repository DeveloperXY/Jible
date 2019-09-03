const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const mongo = require("./mongo");
const User = mongo.User;

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

app.listen(port, () => console.log(`Example app listening on port ${port}`));
