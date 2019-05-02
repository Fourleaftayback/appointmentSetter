const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const randomstring = require("randomstring");
const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");

const Team = require("../models/Team");
const EmailErrors = require("../models/EmailErrors");

const keys = process.env.secret;

const validateLoginInput = require("../validation/loginValidation");
const validateRegisterInput = require("../validation/registerValidation");
const validateEmail = require("../validation/emailValidation");
const validateTeamRegister = require("../validation/registerTeamValidation");

const { TeamRegistrationMessage } = require("../emails/Emails");
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

// @route   POST team/test/register
// @desc    Register team for testing purposes only
// @access  Public
router.post("/test/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  Team.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      let newTeam = new Team({
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newTeam.password, salt, (err, hash) => {
          if (err) throw err;
          newTeam.password = hash;
          newTeam
            .save()
            .then(team => res.json(team)) //change after testing to just return status
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   POST team/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  let { email, password } = req.body;

  Team.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "This Email does not Exist";
      return res.status(400).json(errors);
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          phone: user.phone,
          isAdmin: user.isAdmin
        };

        jwt.sign(payload, keys, { expiresIn: 7200 }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        });
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   POST team/create
// @desc    Admin Only can create new user invite sent to the user only then they will need to register in the route
// @access  private

router.post(
  "/create",
  passport.authenticate("teamPass", { session: false }),
  (req, res) => {
    if (!req.user.isAdmin)
      return res
        .status(400)
        .json({ errors: "Sorry you are authorized to create a new user" });

    const { errors, isValid } = validateEmail(req.body);
    if (!isValid) return res.status(400).json(errors);

    let randomStr = randomstring.generate({
      length: 10,
      charset: "alphanumeric"
    });

    let isAmdin = req.body.isAdmin === "true" ? true : false;
    let token = crypto.randomBytes(20).toString("hex");

    let newTeam = new Team({
      email: req.body.email,
      isAmdin: isAmdin,
      password: randomStr,
      resetPasswordToken: token
    });

    newTeam.save();
    let mail = new TeamRegistrationMessage(req.body.email, token, req.hostname);

    sgMail
      .send(mail)
      .then(() => {
        return res.status(200).json({
          message:
            "please have the team memeber check thier Email to finish the registration process"
        });
      })
      .catch(err => {
        let emailErr = new EmailErrors(req.body.email, "/team/create", err);
        emailErr.save();
        errors.email = "Sorry email could not be sent";
        return res.status(400).json(errors);
      });
  }
);

// @route   GET /team/register/:token
// @desc    route to redirect team to register page to complete set up
// @access  Public
router.get("/register/:token", (req, res) => {
  Team.findOne({ resetPasswordToken: req.params.token }).then(team => {
    if (!team)
      return res.redirect(`https://${req.hostname}/reset/team/notvalid`);

    return res.redirect(
      `https://${req.hostname}/team/register/${req.params.token}`
    );
  });
});

// @route   POST /team/register
// @desc    get token for req from the params in frontend
// @access  Public

router.post("/register", (req, res) => {
  const { errors, isValid } = validateTeamRegister(req.body);
  if (!isValid) return res.status(400).json(errors);

  Team.findOne({
    resetPasswordToken: req.body.resetPasswordToken
  }).then(team => {
    if (!team) {
      errors.password = "Sorry registration could not be complete";
      return res.status(400).json(errors);
    }
    let newPassword = req.body.password;
    bcrypt.getSalt(10, (err, salt) => {
      bcrypt.hash(newPassword, salt, (err, hash) => {
        team.password = hash;
        team.first_name = req.body.first_name;
        team.last_name = req.body.last_name;
        team.phone = req.body.phone;
        team.resetPasswordToken = undefined;
        team
          .save()
          .then(() => res.status(200).json({ teamInfo: "updated" }))
          .catch(err => {
            errors.teamInfo = "Sorry your information could not be updated";
            return res.status(400).json(errors);
          });
      });
    });
  });
});

module.exports = router;
