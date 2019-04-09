const express = require("express");
const router = express.Router();
const passport = require("passport");
const moment = require("moment");

const Appointment = require("../models/Appointment");

const EmailErrors = require("../models/EmailErrors");

const {
  ClientConfirmAppMessage,
  ClientRejectAppMessage
} = require("../emails/Emails");
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

require("../config/passportTeam")(passport);

// @route   GET confirm/team/:token
// @desc    route showing route to confirm appoinments for team members
// @access  Private

router.get(
  "/team/:id",
  passport.authenticate("teamPass", { session: false }),
  (req, res) => {
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

router.put(
  "/team/:id",
  passport.authenticate("teamPass", { session: false }),
  (req, res) => {
    let confirm = req.body.confirm === "true" ? true : false;
    if (confirm) {
      Appointment.findById(req.params.id)
        .then(app => {
          app.confirmed = true;
          app.save().then(data => {
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
                  .json({ email: "Confirmation sent to cient" });
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
          });
        })
        .catch(err => {
          return res.status(400).json({ appoinment: "Appointment not found" });
        });
    } else {
      Appointment.findById(req.params.id).then(app => {
        if (!app)
          return res.status(400).json({ errors: "something went wrong" });
        let email = new ClientRejectAppMessage(
          app.client_info.email,
          app.client_info.first_name,
          moment(app.appointment_start).format("LLLL"),
          app.team_info.first_name
        );
        app.remove();
        sgMail
          .send(email)
          .then(() => {
            return res
              .status(200)
              .json({ email: "Email sent to client to reschedule" });
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
      });
    }
  }
);
