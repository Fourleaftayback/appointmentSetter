const express = require("express");
const router = express.Router();
const passport = require("passport");

const Appointment = require("../models/Appointment");
const Team = require("../models/Team");
const User = require("../models/User");

const validateAppointment = require("../validation/appointmentValidation");

require("../config/passportTeam")(passport);

// @route   Post team/appointment/add
// @desc    add new appointment to Team
// @access  Private
router.post(
  "/add",
  passport.authenticate("teamPass", { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateAppointment(req.body);

    if (!isValid) return res.status(400).json(errors);

    let userInfo = await User.findById(
      req.body.clientId,
      "email first_name last_name phone"
    );

    let teamInfo = await Team.findById(
      req.body.teamId,
      "email first_name last_name phone"
    );

    let newAppointment = new Appointment({
      user: req.body.clientId,
      client_info: userInfo,
      appointment_type: req.body.appointment_type,
      appointment_start: req.body.appointment_start,
      appointment_end: req.body.appointment_end,
      team_member_id: req.body.teamId,
      team_member_info: teamInfo,
      date_requested_on: Date.now()
    });

    newAppointment
      .save()
      .then(app => {
        res.status(200).json({ status: "appointment saved" });
      })
      .catch(err => res.status(400).json({ errors: "failed to save" }));
  }
);

// @route   team/appointment/delete/:id
// @desc    delete appointment by appointment id
// @access  private team

router.delete(
  "/delete/:id",
  passport.authenticate("teamPass", { session: false }),
  (req, res) => {
    Appointment.findById(req.params.id)
      .then(app => {
        app.remove().then(() => res.status(200).json({ success: true }));
      })
      .catch(err =>
        res.status(400).json({ errors: "Appointment does not exist" })
      );
  }
);

// @route   Get team/appointment/all
// @desc    get All data for Team side only
// @access  private
router.get(
  "/all",
  passport.authenticate("teamPass", { session: false }),
  (req, res) => {
    Appointment.find({ appointment_end: { $gte: Date.now() } })
      .then(app => {
        res.status(200).json(app);
      })
      .catch(err =>
        res
          .status(400)
          .json({ errors: { error: "Sorry could not fetch data" } })
      );
  }
);

// @route   Get team/appointment/team
// @desc    get appointment by team ID
// @access  private
router.get(
  "/team",
  passport.authenticate("teamPass", { session: false }),
  (req, res) => {
    Appointment.find({
      team_member_id: req.user.id,
      appointment_end: { $gte: Date.now() }
    })
      .then(app => {
        res.status(200).json(app);
      })
      .catch(err =>
        res
          .status(400)
          .json({ errors: { error: "Sorry coulld not fetch data" } })
      );
  }
);

// @route   Get team/appointment/allclients
// @desc    get list of all clients
// @access  private

router.get(
  "/allclients",
  passport.authenticate("teamPass", { session: false }),
  (req, res) => {
    User.find({})
      .select("email first_name")
      .sort({ email: 1 })
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => res.status(400).json({ errors: { error: err } }));
  }
);

module.exports = router;
