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
  date: {
    type: String,
    default: new Date().toTimeString()
  },
  price: String,
  distanceValue: Number,
  actualPrice: {
    type: Number,
    default: 0
  },
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
  timeAndDistance: String,
  initialRiderLocation: {
    lat: String,
    lng: String
  },
  currentRiderLocation: {
    lat: String,
    lng: String
  },
  description: String,
  riderId: {
    type: String,
    ref: "User"
  },
  rating: {
    type: Number,
    default: 0
  },
  items: [
    {
      name: String,
      isReady: {
        type: Boolean,
        default: false
      },
      price: Number
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

let riderNotificationSchema = new mongoose.Schema({
  riderId: String,
  skhera: skheraSchema,
  date: {
    type: Date,
    default: Date.now
  }
});
let RiderNotification = mongoose.model(
  "RiderNotification",
  riderNotificationSchema
);

let clientNotificationSchema = new mongoose.Schema({
  userId: String,
  skheraId: String,
  type: String,
  rider: userSchema,
  date: {
    type: Date,
    default: Date.now
  }
});
let ClientNotification = mongoose.model(
  "ClientNotification",
  clientNotificationSchema
);

module.exports = {
  db,
  User,
  Skhera,
  Address,
  RiderLocation,
  RiderNotification,
  ClientNotification,
  ObjectId: mongoose.Types.ObjectId
};
