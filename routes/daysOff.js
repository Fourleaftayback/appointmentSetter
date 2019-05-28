const express = require("express");
const router = express.Router();
const passport = require("passport");
const randonstring = require("randomstring");

const Appointment = require("../models/Appointment");
//const Team = require("../models/Team");

const converter = require("../controller/dataConverter");

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
//need to passin an adjusted date due to time difference
//2019-05-18T04:00:38.793Z - 2019-05-19T03:59:38.793Z
// @desc    add reocurring days off set date start,  end, weeks in the fron end
// @access  Private

router.post(
  "/addmany",
  passport.authenticate("teamPass", { session: false }),
  (req, res) => {
    const daysOffArr = converter.createDaysOffArray(
      req.user.id,
      req.body.appointment_start,
      req.body.appointment_end,
      req.body.weeks,
      randonstring.generate(8)
    );
    Appointment.insertMany(daysOffArr, { ordered: true })
      .then(() => res.status(200).json({ success: "Day off set" }))
      .catch(err =>
        res.status(400).json({ errors: "The day off could not be set." })
      );
  }
);

// @route   GET /daysoff/all
// @desc    get days off for team member
// @access  Private
router.get(
  "/all",
  passport.authenticate("teamPass", { session: false }),
  (req, res) => {
    console.log(new Date());
    Appointment.find({
      team_member_id: req.user.id,
      day_off: true,
      appointment_start: { $gte: converter.setTime(new Date(), 0, 0) }
    })
      .select("-confirmed -user")
      .sort("appointment_start")
      .then(daysOff => res.status(200).json(daysOff))
      .catch(err => res.status(400).json({ errors: { error: err } }));
  }
);
// @route   Delete /daysoff/removeone/:id
// @desc    removes one by id
// @access  Private
router.delete(
  "/removeone/:id",
  passport.authenticate("teamPass", { session: false }),
  (req, res) => {
    Appointment.findByIdAndRemove(req.params.id)
      .then(() => {
        return res.status(200).json({ success: "day off was removed" });
      })
      .catch(err => res.status(400).json({ errors: "could not be removed" }));
  }
);

// @route   Delete /daysoff/removemany/:id
// @desc    removes days off by days_off_group
// @access  Private
router.delete(
  "/removemany/:id",
  passport.authenticate("teamPass", { session: false }),
  (req, res) => {
    Appointment.deleteMany({ days_off_group: req.params.id })
      .then(del => {
        if (del.n === 0)
          return res
            .status(400)
            .json({ errors: "Sorry but days off could not be found" });
        return res.status(200).json({ success: "Days off has been delete" });
      })
      .catch(err =>
        res.status(400).json({ errors: "Sorry somehting went wrong." })
      );
  }
);

module.exports = router;
