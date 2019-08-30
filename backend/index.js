const express = require("express");
const bodyParser = require("body-parser");
const mongo = require("./mongo");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const port = 9000;

app.get("/", (req, res) => res.send("Hello World"));

app.post("/signup", (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let image = req.body.image;

  new mongo.User({
    name,
    email,
    image
  }).save((err, user) => {
    if (err) return console.error(err);
    res.send({ status: "ok" });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
