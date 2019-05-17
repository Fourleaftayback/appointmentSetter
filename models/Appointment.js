const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");
const Team = require("./Team");

// Create Schema
const AppointmentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  client_info: {
    type: Object,
    required: true
  },
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
  day_off: {
    type: Boolean,
    required: true,
    default: false
  },
  days_off_group: {
    type: String
  },
  team_member_id: {
    type: String,
    required: true
  },
  team_member_info: {
    type: Object,
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
