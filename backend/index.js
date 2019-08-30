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
    if (error) res.send({ status: "error", message: console.error(error) });
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
        if (error) res.send({ status: "error", message: console.error(error) });
        res.send({ status: "ok" });
      });
    }
  });
});

app.post("/login", (req, res) => {
  let email = req.body.email;

  User.findOne({ email }, (error, user) => {
    if (error) res.send({ status: "error", message: console.error(error) });
    if (user) {
      res.send({
        status: "ok"
      });
    } else {
      res.send({ status: "no_such_user" });
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
