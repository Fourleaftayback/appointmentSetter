const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const passport = require("passport");

const Team = require("../models/Team");
const keys = process.env.secret;

const validateLoginInput = require("../validation/teamValidation/loginValidation");
const validateRegisterInput = require("../validation/teamValidation/registerValidation");

// @route   POST team/register
// @desc    Register team for testing purposes only
// @access  Public
router.post("/register", (req, res) => {
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
        access_level: req.body.access_level,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newTeam.password, salt, (err, hash) => {
          if (err) throw err;
          newTeam.password = hash;
          newTeam
            .save()
            .then(team => res.json(team)) //consider changing the response to maybe just status
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//place validation here
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
        const payload = { id: user.id, first_name: user.first_name };

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

module.exports = router;
