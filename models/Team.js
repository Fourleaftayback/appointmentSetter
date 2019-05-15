const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TeamSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    default: "new team"
  },
  last_name: {
    type: String,
    default: "new team"
  },
  phone: {
    type: Number,
    default: 0
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
  created_on: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken: {
    type: String,
    default: undefined
  },
  resetPasswordExp: {
    type: Date,
    default: undefined
  }
});

module.exports = Team = mongoose.model("team", TeamSchema);
