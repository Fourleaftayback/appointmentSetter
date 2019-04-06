const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const Team = require("../models/Team");
const keys = process.env.secret;

const validateLoginInput = require("../validation/loginValidation");
const validateRegisterInput = require("../validation/registerValidation");

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
// @desc    admin only can create new user invite sent to the user only then they will need to register in the route
// @access  private

router.post(
  "/create",
  passport.authenticate("teamPass", { session: false }),
  (req, res) => {
    if (!req.user.isAdmin) {
      return res
        .status(400)
        .json({ errors: "Sorry you are authorized to create a new user" });
    }
    //get email from request, save data to a new model, send email ...set up other routes GET , Register Routes to create a new team member
    //set up emailer to manage the request here to send the email that provides the route to register the user
  }
);

module.exports = router;
