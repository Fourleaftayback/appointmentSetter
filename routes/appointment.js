const express = require("express");
const router = express.Router();
const passport = require("passport");

const Appointment = require("../models/Appointment");

const validateAppointment = require("../validation/appointmentValidation");

// @route   Post appointment/add
// @desc    add new appointment to Data
// @access  Private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateAppointment(req.body);

    if (!isValid) return res.status(400).json(errors);
    let teamName = ""; //get team members data then attach to doc

    let newAppointment = new Appointment({
      user: req.user.id,
      appointment_type: req.body.appointment_type,
      appointment_start: req.body.start,
      appointment_end: req.body.end,
      client_phone: req.user.phone,
      client_email: req.user.email,
      client_name: `${req.user.first_name} + " " + ${req.user.last_name}`,
      team_name: teamName,
      date_requested_on: Date.now()
    });

    console.log(newAppointment);
    /*
    newAppointment
      .save()
      .then(doc => res.json(doc))
      .catch(err => console.log(err));
    */
  }
);

module.exports = router;
