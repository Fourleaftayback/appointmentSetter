const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const EmailErrors = require("../models/EmailErrors");

const validateEmail = require("../validation/emailValidation");
const validateResetPassword = require("../validation/resetPasswordValidation");

const { PasswordResetMessage } = require("../emails/Emails");
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

// @route   POST reset/user/forgot
// @desc    request user reset email
// @access  Public

router.post("/forgot", (req, res) => {
  const { errors, isValid } = validateEmail(req.body);
  if (!isValid) return res.status(400).json(errors);

  let token = crypto.randomBytes(20).toString("hex");
  User.findOneAndUpdate(
    { email: req.body.email },
    {
      resetPasswordToken: token,
      resetPasswordExp: Date.now() + 3600000
    }
  ).then(user => {
    if (!user) {
      errors.email = "Sorry this email does not exist";
      return res.status(400).json(errors);
    }
    user.save();

    let email = new PasswordResetMessage(req.body.email, token, req.hostname);
    sgMail
      .send(email)
      .then(() => {
        return res.status(200).json({ email: "email sent" });
      })
      .catch(err => {
        let emailErr = new EmailErrors(
          req.body.email,
          "/reset/user/forgot",
          err
        );
        emailErr.save();
        errors.email = "Sorry email could not be sent";
        return res.status(400).json(errors);
      });
  });
});

// @route   GET reset/user/:token
// @desc    route for managing reset route for user
// @access  Private

router.get("/:token", (req, res) => {
  User.findOne({
    resetPassworsToken: req.params.token,
    resetPasswordExp: { $gte: Date.now() }
  }).then(user => {
    if (!user)
      return res.redirect(`https://${req.hostname}/reset/user/notvalid`);

    return res.redirect(
      `https://${req.hostname}/reset/user/password/${req.params.token}`
    );
  });
});

// @route   POST reset/user/newpassword
// @desc    set new passoword. the token is passed from the body get from url params in redux
// @access  public
router.post("/newpassword", (req, res) => {
  const { errors, isValid } = validateResetPassword(req.body);
  if (!isValid) return res.status(400).json(errors);

  User.findOne({ resetPasswordToken: req.body.resetPasswordToken }).then(
    user => {
      if (!user) {
        errors.password = "Sorry your password could not be reset";
        return res.status(400).json(errors);
      }
      let newPassword = req.body.password;
      bcrypt.getSalt(10, (err, salt) => {
        bcrypt.hash(newPassword, salt, (err, hash) => {
          user.password = hash;
          user.resetPasswordToken = undefined;
          user.resetPasswordExp = undefined;
          user
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
