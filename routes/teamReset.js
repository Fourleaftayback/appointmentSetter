const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");
const bcrypt = require("bcryptjs");

const Team = require("../models/User");
const EmailErrors = require("../models/EmailErrors");

const validateEmail = require("../validation/emailValidation");
const validateResetPassword = require("../validation/resetPasswordValidation");

const { PasswordResetMessage } = require("../emails/Emails");
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

// @route   POST reset/team/forgot
// @desc    request user reset email
// @access  Public

router.post("/forgot", (req, res) => {
  console.log("running from team ");

  const { errors, isValid } = validateEmail(req.body);
  if (!isValid) return res.status(400).json(errors);

  let token = crypto.randomBytes(20).toString("hex");
  Team.findOneAndUpdate(
    { email: req.body.email },
    {
      resetPasswordToken: token,
      resetPasswordExp: Date.now() + 3600000
    }
  ).then(team => {
    if (!team) {
      errors.email = "Sorry this email does not exist";
      return res.status(400).json(errors);
    }
    team.save().then(() =>
      res.status(200).json({
        success:
          "Please check your email. You should recieve a link to reset your password"
      })
    );
    //refactor after testing
    /*
    let email = new PasswordResetMessage(req.body.email, token, req.hostname);
    sgMail
      .send(email)
      .then(() => {
        return res.status(200).json({
          success:
            "Please check your email. You should recieve a link to reset your password"
        });
      })
      .catch(err => {
        let emailErr = new EmailErrors(
          req.body.email,
          "/reset/team/forgot",
          err
        );
        emailErr.save();
        errors.email = "Sorry email could not be sent";
        return res.status(400).json(errors);
      });
      */
  });
});

// @route   GET reset/team/:token
// @desc    route for managing reset route for user
// @access  Private

router.get("/:token", (req, res) => {
  Team.findOne({
    resetPassworsToken: req.params.token,
    resetPasswordExp: { $gte: Date.now() }
  }).then(team => {
    if (!team)
      return res.redirect(`https://${req.hostname}/reset/team/notvalid`);
    return res.redirect(
      `https://${req.hostname}/reset/team/password/${req.params.token}`
    );
  });
});

// @route   POST reset/team/newpassword
// @desc    set new passoword. the token is passed from the body get from url params in redux
// @access  public
router.post("/newpassword", (req, res) => {
  const { errors, isValid } = validateResetPassword(req.body);
  if (!isValid) return res.status(400).json(errors);

  Team.findOne({ resetPasswordToken: req.body.resetPasswordToken }).then(
    team => {
      if (!team) {
        errors.password = "Sorry your password could not be reset";
        return res.status(400).json(errors);
      }
      let newPassword = req.body.password;
      bcrypt.getSalt(10, (err, salt) => {
        bcrypt.hash(newPassword, salt, (err, hash) => {
          team.password = hash;
          team.resetPasswordToken = undefined;
          team.resetPasswordExp = undefined;
          team
            .save()
            .then(() => res.status(200).json({ success: true }))
            .catch(err => {
              errors.password = "Sorry password could not be reset";
              return res.status(400).json(errors);
            });
        });
      });
    }
  );
});

module.exports = router;
