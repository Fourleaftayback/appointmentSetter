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

// @route   put team/appointment/edit/:id
// @desc    edit appointment by team ID
// @access  private

router.put(
  "/edit/:id",
  passport.authenticate("teamPass", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateAppointment(req.body);

    if (!isValid) return res.status(400).json(errors);
    Appointment.findOneAndUpdate(
      { _id: req.params.id },
      {
        appointment_type: req.body.appointment_type,
        appointment_start: req.body.appointment_start,
        appointment_end: req.body.appointment_end
      }
    )
      .then(app => {
        if (!app)
          return res.status(400).json({
            errors: "This appointment does not exist."
          });
        if (req.user.isAdmin) {
          app.save();
          return res.status(400).json({ appointment: "success" });
        }
        if (app.team_member_id !== req.user.id) {
          return res.status(400).json({
            errors: "Sorry you are not authorized to modify this appointment"
          });
        }
        app.save();
        return res.status(400).json({ appointment: "success" });
      })
      .catch(err => res.status(400).json({ errors: err }));
  }
);

// @route   Get team/appointment/delete/:id
// @desc    delete appointment by appointment id
// @access  private team
router.delete(
  "/delete/:id",
  passport.authenticate("teamPass", { session: false }),
  (req, res) => {
    Appointment.findById(req.params.id)
      .then(data => {
        if (req.user.isAdmin) {
          data.remove();
          return res.status(200).json({ success: true });
        }
        if (data.team_member_id !== req.user._id.toString()) {
          return res.status(401).json({
            errors: "You are not authorized to change this appointment"
          });
        }

        data.remove();
        res.status(200).json({ success: true });
      })
      .catch(err =>
        res.status(404).json({ errors: "This appointment was not found" })
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
      .catch(err => res.status(400).json({ errors: err }));
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
      .catch(err => res.status(400).json({ errors: err }));
  }
);

module.exports = router;
