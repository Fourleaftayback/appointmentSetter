const express = require("express");
const router = express.Router();
const passport = require("passport");
//const moment = require("moment");
const sgMail = require("@sendgrid/mail");

const Appointment = require("../models/Appointment");

const EmailErrors = require("../models/EmailErrors");

const { ClientConfirmAppMessage } = require("../emails/Emails");
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

require("../config/passportTeam")(passport);

// @route   GET /confirm/appointment/:id
// @desc    route gets info about the single appointment
// @access  Private

router.get(
  "/appointment/:id",
  passport.authenticate("teamPass", { session: false }),
  (req, res) => {
    Appointment.findById(req.params.id)
      .select(
        "-days_off -days_off_group -team_member_info -date_requested_on -date_updated_on"
      )
      .then(app => res.status(200).json(app))
      .catch(err =>
        res.status(400).json({ errors: { erorr: "cannot find appointment" } })
      );
  }
);

// @route   GET confirm/team/:token
// @desc    route showing route to confirm appoinments for team members
// @access  Private

router.get(
  "/team/:id",
  passport.authenticate("teamPass", { session: false }),
  (req, res) => {
    console.log("called");
    Appointment.findById(req.params.id).then(app => {
      if (!app)
        return res.redirect(`https://${req.hostname}/confirm/team/notvalid`);
      if (app.confirmed)
        return res.redirect(`https://${req.hostname}/confirm/team/notvalid`);

      return res.redirect(
        `https://${req.hostname}/confirm/team/${req.params.id}`
      );
    });
  }
);

// @route   PUT /confirm/team/appointment/:id
// @desc    route confirms appointment
// @access  Private

router.put(
  "/team/appointment/:id",
  passport.authenticate("teamPass", { session: false }),
  (req, res) => {
    Appointment.findById(req.params.id).then(app => {
      app.confirmed = true;
      app
        .save()
        .then(data => {
          let email = new ClientConfirmAppMessage(
            data.client_info.email,
            data.client_info.first_name,
            moment(data.appointment_start).format("LLLL"),
            data.team_info.first_name
          );
          sgMail
            .send(email)
            .then(() => {
              return res
                .status(200)
                .json({ success: "Confirmation sent to cient" });
            })
            .catch(err => {
              let emailErr = new EmailErrors(
                data.client_info.email,
                "/confirm/team/:token",
                err
              );
              emailErr.save();
              return res.status(400).json({ errors: "Email was not sent" });
            });
        })
        .catch(err => {
          return res.status(400).json({ appoinment: "Appointment not found" });
        });
    });
  }
);

module.exports = router;
