const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UsersSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: String,
  name: String,
  phone: Number,
  DOB: String,
  password: String,
});

module.exports = mongoose.model("users", UsersSchema);
