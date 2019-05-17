const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const keys = process.env.secret;

const validateLoginInput = require("../validation/loginValidation");
const validateRegisterInput = require("../validation/registerValidation");
const validateProfile = require("../validation/profileValidation");

// @route   POST user/register
// @desc    user(client) registration
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      let newUser = new User({
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone.replace(/\(|\)|-/g, ""),
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user)) //change after testing to just return status
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   POST user/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  let { email, password } = req.body;

  User.findOne({ email }).then(user => {
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
          phone: user.phone
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
// @route   PUT /user/modify
// @desc    Change User Info
// @access  Private
router.put(
  "/modify",
  passport.authenticate("userPass", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfile(req.body);
    if (!isValid) return res.status(400).json(errors);
    User.findOneAndUpdate(
      { _id: req.user.id },
      {
        email: req.body.email,
        phone: req.body.phone.replace(/\(|\)|-/g, "")
      }
    )
      .select("-password -created_on")
      .then(user => {
        if (!user) {
          errors.user = "Sorry something went wrong";
          return res.status(400).json(errors);
        }
        user.save().then(() => {
          const payload = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: req.body.email,
            phone: req.body.phone
          };
          jwt.sign(payload, keys, { expiresIn: 7200 }, (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          });
        });
      })
      .catch(err => res.status(400).json(err));
  }
);
module.exports = router;
