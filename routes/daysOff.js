const express = require("express");
const router = express.Router();
const passport = require("passport");

const Appointment = require("../models/Appointment");
//const Team = require("../models/Team");

const createDaysOffArray = require("../controller/dataConverter");

require("../config/passportTeam")(passport);

// @route   Post /daysoff/addone
// @desc    add new one day off set date start and end in the fron end
// @access  Private

router.post(
  "/addone",
  passport.authenticate("teamPass", { session: false }),
  (req, res) => {
    let newAppointment = new Appointment({
      user: "5cddfcf01de6df0b4669ff3e",
      client_info: {},
      appointment_type: "day off",
      appointment_start: req.body.appointment_start,
      appointment_end: req.body.appointment_end,
      day_off: true,
      team_member_id: req.user.id,
      team_member_info: {},
      date_requested_on: Date.now()
    });
    newAppointment
      .save()
      .then(() => {
        res.status(200).json({ success: "Day off set" });
      })
      .catch(err =>
        res.status(400).json({ errors: "The day off could not be set." })
      );
  }
);

// @route   Post /daysoff/addmany
// @desc    add reocurring days off set date start,  end, weeks in the fron end
// @access  Private

router.post(
  "/addmany",
  passport.authenticate("teamPass", { session: false }),
  (req, res) => {
    const daysOffArr = createDaysOffArray(
      req.user.id,
      req.body.appointment_start,
      req.body.appointment_end,
      req.body.weeks
    );
    Appointment.insertMany(daysOffArr, { ordered: true })
      .then(() => res.status(200).json({ success: "Day off set" }))
      .catch(err =>
        res.status(400).json({ errors: "The day off could not be set." })
      );
  }
);

module.exports = router;
