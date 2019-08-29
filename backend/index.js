const express = require("express");
const app = express();
const port = 9000;

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connection to MongoDB was successful.");
});

app.get("/", (req, res) => res.send("Hello World"));
app.listen(port, () => console.log(`Example app listening on port ${port}`));
