const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AppointmentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  } /*,
  team: {
    type: Schema.Types.ObjectId,
    ref: "team",
    required: true
  } */,
  appointment_type: {
    type: String,
    required: true
  },
  appointment_start: {
    type: Date,
    required: true
  },
  appointment_end: {
    type: Date,
    required: true
  },
  confirmed: {
    type: Boolean,
    required: true,
    default: false
  },
  client_phone: {
    type: Number,
    required: true
  },
  client_email: {
    type: String,
    required: true
  },
  client_name: {
    type: String,
    required: true
  },
  team_name: {
    type: String,
    required: true
  },
  date_requested_on: {
    type: Date,
    required: true
  },
  date_updated_on: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = Appointment = mongoose.model("appointment", AppointmentSchema);
