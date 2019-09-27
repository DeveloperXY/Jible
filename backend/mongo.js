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
  facebookId: String,
  phone: String,

  // for riders only
  currentSkheraId: {
    type: String,
    default: null
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
});
let User = mongoose.model("User", userSchema);

let skheraSchema = new mongoose.Schema({
  clientId: String,
  status: {
    type: String,
    default: "ORDER_RECEIVED"
  },
  deliveryStatus: {
    type: String,
    default: "NOT_PICKED_UP_YET"
  },
  date: {
    type: String,
    default: new Date().toTimeString()
  },
  price: String,
  fromAddress: {
    name: String,
    lat: String,
    lng: String
  },
  toAddress: {
    name: String,
    lat: String,
    lng: String
  },
  initialRiderLocation: {
    lat: String,
    lng: String
  },
  currentRiderLocation: {
    lat: String,
    lng: String
  },
  description: String,
  riderId: String,
  items: [
    {
      name: String,
      isReady: {
        type: Boolean,
        default: false
      }
    }
  ]
});
let Skhera = mongoose.model("Skhera", skheraSchema);

let addressSchema = new mongoose.Schema({
  placeId: String,
  userId: String,
  name: String,
  lat: String,
  lng: String
});
let Address = mongoose.model("Address", addressSchema);

let locationSchema = new mongoose.Schema({
  riderId: String,
  lat: Number,
  lng: Number
});
let RiderLocation = mongoose.model("RiderLocation", locationSchema);

module.exports = {
  db,
  User,
  Skhera,
  Address,
  RiderLocation,
  ObjectId: mongoose.Types.ObjectId
};
