var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test", {
  useNewUrlParser: true,
  useFindAndModify: false
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connection to MongoDB was successful.");
});

let userSchema = new mongoose.Schema({
  name: String,
  email: String,
  image: String,
  userType: String,
  phone: String
});
let User = mongoose.model("User", userSchema);

module.exports = {
  db,
  User
};
