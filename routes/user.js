const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Busboy = require("busboy");

const User = require("../models/User");
const keys = process.env.secret;

const validateLoginInput = require("../validation/loginValidation");
const validateRegisterInput = require("../validation/registerValidation");
const validateProfile = require("../validation/profileValidation");

const uploadToS3 = require("../aws/s3bucket");

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
          phone: user.phone,
          profileImage: user.image_url
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
    const mimes = ["image/png", "image/jpeg", "image/jpg"];
    let newData = {
      email: req.body.email,
      phone: req.body.phone.replace(/\(|\)|-/g, "")
    };
    const busboy = new Busboy({
      headers: req.headers
    });

    if (req.files.image !== undefined) {
      busboy.on("finish", () => {
        const image = req.files.image;
        if (image.size > 3000000) {
          errors.image = "Image can not be larger than 3mbs";
          return res.status(413).json(errors);
        }
        if (!mimes.includes(image.mimetype)) {
          errors.image = "This image format is not supported";
          return res.status(422).json(errors);
        }
        let aws = uploadToS3(image);
        aws
          .then(data => {
            newData.image_url = data.Location;
            User.findOneAndUpdate({ _id: req.user.id }, newData, { new: true })
              .select("-password -created_on")
              .then(user => {
                if (!user) {
                  errors.user = "Sorry something went wrong";
                  return res.status(400).json(errors);
                }
                const payload = {
                  id: user.id,
                  first_name: user.first_name,
                  last_name: user.last_name,
                  email: user.email,
                  phone: user.phone,
                  profileImage: user.image_url
                };
                jwt.sign(payload, keys, { expiresIn: 7200 }, (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token
                  });
                });
              })
              .catch(err => res.status(400).json(err));
          })
          .catch(err => {
            errors.image = "Image failed to save. AWS ERROR";
            res.json(400).json(errors);
          });
      });
    } else {
      User.findOneAndUpdate({ _id: req.user.id }, newData, { new: true })
        .select("-password -created_on")
        .then(user => {
          if (!user) {
            errors.user = "Sorry something went wrong";
            return res.status(400).json(errors);
          }

          const payload = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone: user.phone,
            profileImage: user.image_url
          };
          jwt.sign(payload, keys, { expiresIn: 7200 }, (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          });
        })
        .catch(err => res.status(400).json(err));
    }
    req.pipe(busboy);
  }
);

module.exports = router;
