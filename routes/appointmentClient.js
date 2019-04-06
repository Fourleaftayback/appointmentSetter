const express = require("express");
const router = express.Router();
const passport = require("passport");

const Appointment = require("../models/Appointment");
const Team = require("../models/Team");
const User = require("../models/User");

const validateAppointment = require("../validation/appointmentValidation");

require("../config/passportUser")(passport);

// @route   Post appointment/add
// @desc    add new appointment to Data
// @access  Private
router.post(
  "/add",
  passport.authenticate("userPass", { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateAppointment(req.body);

    if (!isValid) return res.status(400).json(errors);
    let userInfo = await User.findById(
      req.user.id,
      "email first_name last_name phone"
    );
    let teamInfo = await Team.findById(
      req.body.teamId,
      "email first_name last_name phone"
    );

    let newAppointment = new Appointment({
      user: req.user.id,
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

// @route   Put appointment/edit/:id
// @desc    modify appointment
// @access  Private

router.put(
  "/edit/:id",
  passport.authenticate("userPass", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateAppointment(req.body);

    if (!isValid) return res.status(400).json(errors);

    Appointment.findOneAndUpdate(
      { _id: req.params.id },
      {
        appointment_type: req.body.appointment_type,
        appointment_start: req.body.appointment_start,
        appointment_end: req.body.appointment_end,
        confirmed: false
      }
    )
      .then(app => {
        if (!app)
          return res.status(400).json({
            errors: "This appointment does not exist."
          });
        if (app.user._id !== req.user._id) {
          return res.status(400).json({
            errors: "Sorry you are not authorized to modify this appointment"
          });
        }
        app.save();
        return res.status(400).json({
          appointment: "You will recieve a email confirming your change soon"
        });
      })
      .catch(err => res.status(400).json({ errors: err }));
  }
);

// @route   Delete appointment/delete/:id
// @desc    delete appointment
// @access  Private

router.delete(
  "/delete/:id",
  passport.authenticate("userPass", { session: false }),
  (req, res) => {
    Appointment.findById(req.params.id)
      .then(app => {
        if (req.user._id.toString() != app.user._id)
          return res.status(404).json({
            errors: "You are not authorized to change this appointment"
          });
        if (Date.now() > new Date(app.appointment_start - 3600000)) {
          return res.status(400).json({
            errors:
              "You care too close to the appointment to cancel online, Please call directly to cancel"
          });
        }
        app.remove().then(() => res.status(200).json({ success: true }));
      })
      .catch(err =>
        res.status(400).json({ errors: "Appointment does not exist" })
      );
  }
);

// @route   Get appointment/all
// @desc    get All data for client side only
// @access  Public
router.get("/all", (req, res) => {
  Appointment.find({ appointment_end: { $gte: Date.now() } })
    .select("-client_info -team_member_info -team_member_info -date_updated_on")
    .then(app => {
      res.status(200).json(app);
    })
    .catch(err => res.status(400).json({ errors: err }));
});

// @route   Get appointment/team/id
// @desc    get All data for client side only (might now need this feature eventually)
// @access  Public
router.get("/appointment/team/:id", (req, res) => {
  Appointment.find({
    team_member_id: params.id,
    appointment_end: { $gte: Date.now() }
  })
    .select("-client_info -team_member_info -team_member_info -date_updated_on")
    .then(app => {
      res.status(200).json(app);
    })
    .catch(err => res.status(400).json({ errors: err }));
});

module.exports = router;