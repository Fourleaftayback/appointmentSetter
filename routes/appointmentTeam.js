const express = require("express");
const router = express.Router();
const passport = require("passport");

const app = express();

const Appointment = require("../models/Appointment");
const Team = require("../models/Team");
const User = require("../models/User");

app.use(passport.initialize());
require("../config/passportTeam")(passport);

// @route   Get team/appointment/delete/:id
// @desc    delete appointment by appointment id
// @access  Public
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Appointment.findById(req.params.id)
      .then(data => {
        if (data.team_member_id.toString() !== req.user.id) {
          return res.status(401).json({
            errors: "You are not authorized to change this appointment"
          });
        }
        data.remove().then(() => res.json({ success: true }));
      })
      .catch(err =>
        res.status(404).json({ errors: "This appointment was not found" })
      );
  }
);

// @route   Get team/appointment/all
// @desc    get All data for Team side only
// @access  Public
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Appointment.find({ appointment_end: { $gte: Date.now() } })
      .then(app => {
        res.status(200).json(app);
      })
      .catch(err => res.status(400).json({ errors: err }));
  }
);

// @route   Get team/appointment/team
// @desc    get appointment by team ID
// @access  Public
router.get(
  "/team",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Appointment.find({
      team_member_id: req.user.id,
      appointment_end: { $gte: Date.now() }
    })
      .then(app => {
        res.status(200).json(app);
      })
      .catch(err => res.status(400).json({ errors: err }));
  }
);

module.exports = router;
