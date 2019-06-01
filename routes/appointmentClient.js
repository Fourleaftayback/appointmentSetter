const express = require("express");
const router = express.Router();
const passport = require("passport");
const sgMail = require("@sendgrid/mail");

const Appointment = require("../models/Appointment");
const Team = require("../models/Team");
const User = require("../models/User");
const EmailErrors = require("../models/EmailErrors");

const converter = require("../controller/dataConverter");

const validateAppointment = require("../validation/appointmentValidation");

const { TeamConfirmAppMessage } = require("../emails/Emails");
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

require("../config/passportUser")(passport);

// @route   Post appointment/add
// @desc    add new appointment to Data async function
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
        let email = new TeamConfirmAppMessage(
          app.team_member_info.email,
          app.id,
          req.hostname
        );
        app.client_info = undefined;
        app.date_updated_on = undefined;
        app.team_member_id = undefined;
        app.__v = undefined;

        sgMail
          .send(email)
          .then(() => {
            res.status(200).json(app);
          })
          .catch(err => {
            let emailErr = new EmailErrors(
              app.team_member_info.email,
              "/appointment/add",
              err
            );
            emailErr.save();
            errors.email = "Sorry email could not be sent";
            return res.status(400).json(errors);
          });
      })
      .catch(err => {
        errors.appointment = "Failed to save.";
        res.status(400).json(errors);
      });
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
              "You are too close to the appointment time to cancel online, Please call directly to cancel"
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
  Appointment.find({
    appointment_start: { $gte: converter.setTime(Date.now(), 0, 0) }
  })
    .select(
      "-client_info -team_member_info.email -team_member_info._id -team_member_info.last_name -team_member_info.phone -date_updated_on"
    )
    .sort("appointment_start")
    .then(app => {
      res.status(200).json(app);
    })
    .catch(err => res.status(400).json({ errors: { error: err } }));
});

// @route   Get /appointment/user
// @desc    get All data for specific client only
// @access  Private
router.get(
  "/user",
  passport.authenticate("userPass", { session: false }),
  (req, res) => {
    Appointment.find({
      user: req.user.id,
      appointment_start: { $gte: Date.now() }
    })
      .select("-user -client_info -team_member_id -date_updated_on")
      .sort("appointment_start")
      .then(apps => {
        res.status(200).json(apps);
      })
      .catch(err =>
        res.status(400).json({ errors: { failed: "could not retrieve data" } })
      );
  }
);

module.exports = router;
