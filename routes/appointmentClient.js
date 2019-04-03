const express = require("express");
const router = express.Router();
const passport = require("passport");

const Appointment = require("../models/Appointment");
const Team = require("../models/Team");
const User = require("../models/User");

const app = express();

const validateAppointment = require("../validation/appointmentValidation");
//const encryptText = require("../encryption/encrpyt");

app.use(passport.initialize());
require("../config/passportUser")(passport);

// @route   Post appointment/add
// @desc    add new appointment to Data
// @access  Private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
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
