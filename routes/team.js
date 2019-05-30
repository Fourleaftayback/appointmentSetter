const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const randomstring = require("randomstring");
const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");
const Busboy = require("busboy");

const Team = require("../models/Team");
const EmailErrors = require("../models/EmailErrors");

const keys = process.env.secret;

const validateLoginInput = require("../validation/loginValidation");
const validateEmail = require("../validation/emailValidation");
const validateTeamRegister = require("../validation/registerTeamValidation");
const validateProfile = require("../validation/profileValidation");

const uploadToS3 = require("../aws/s3bucket");

const { TeamRegistrationMessage } = require("../emails/Emails");
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

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
          isAdmin: user.isAdmin,
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

//@route   GET team/check/register/:token
// @desc   checks token to see if it is valid. Then will render the page or redirect
// @access  Public
router.get("/check/register/:token", (req, res) => {
  Team.findOne({ resetPasswordToken: req.params.token })
    .then(team => {
      if (team === null) {
        return res.status(400).json({ token: "The token does not exist." });
      } else {
        return res.status(200).json({ success: "Token is still valid" });
      }
    })
    .catch(err => res.status(400).json({ token: "Something went wrong." }));
});

// @route   POST team/create
// @desc    Admin Only can create new user invite sent to the user only then they will need to register in the route
// @access  private

router.post(
  "/create",
  passport.authenticate("teamPass", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEmail(req.body);
    if (!isValid) return res.status(400).json(errors);

    Team.findOne({ email: req.body.email }).then(team => {
      if (team) {
        errors.email = "This Email already Exist";
        return res.status(400).json(errors);
      }
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
      newTeam.save().then(() => {
        let mail = new TeamRegistrationMessage(
          req.body.email,
          token,
          req.hostname
        );
        sgMail
          .send(mail)
          .then(() => {
            return res.status(200).json({
              success:
                "Please have the team member check thier email to complete the registration process"
            });
          })
          .catch(err => {
            let emailErr = new EmailErrors(req.body.email, "/team/create", err);
            emailErr.save();
            errors.email = "Sorry email could not be sent";
            return res.status(400).json(errors);
          });
      });
    });
  }
);

// @route   DELETE team/delete
// @desc    Admin Only can delete
// @access  private

router.delete(
  "/delete/:id",
  passport.authenticate("teamPass", { session: false }),
  (req, res) => {
    if (!req.user.isAdmin)
      return res
        .status(400)
        .json({ fail: "Sorry you are not authorized to delete a user" });

    Team.findById(req.params.id)
      .then(team => {
        if (!team) {
          return res.status(400).json({
            fail: "Sorry we could not locate this user"
          });
        }
        team.remove().then(() => {
          res.status(200).json({ success: "The team member has been deleted" });
        });
      })
      .catch(err => res.status(400).json({ errors: err }));
  }
);

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
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newPassword, salt, (err, hash) => {
        if (err) throw err;
        team.password = hash;
        team.first_name = req.body.first_name;
        team.last_name = req.body.last_name;
        team.phone = Number(req.body.phone.replace(/\(|\)|-/g, ""));
        team.resetPasswordToken = undefined;
        team
          .save()
          .then(user => res.status(200).json(user))
          .catch(err => {
            errors.email = "something went wrong";
            res.status(400).json(errors);
          });
      });
    });
  });
});

// @route   GET /team/allmembers
// @desc    get array of all team members
// @access  Public

router.get("/allmembers", (req, res) => {
  Team.find()
    .select("first_name id image_url")
    .then(members => {
      res.status(200).json(members);
    })
    .catch(err => res.status(400).json({ errors: { error: err } }));
});

// @route   GET /team/allteam
// @desc    get array of all team members
// @access  Private

router.get(
  "/allteam",
  passport.authenticate("teamPass", { session: false }),
  (req, res) => {
    Team.find()
      .select("-password -created_on -resetPasswordToken -resetPasswordExp")
      .then(members => {
        res.status(200).json(members);
      })
      .catch(err => res.status(400).json({ errors: { error: err } }));
  }
);

// @route   PUT /team/modify
// @desc    Change Team Info
// @access  Private

router.put(
  "/modify",
  passport.authenticate("teamPass", { session: false }),
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
            Team.findOneAndUpdate({ _id: req.user.id }, newData, { new: true })
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
                  profileImage: user.image_url,
                  isAdmin: user.isAdmin
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
      Team.findOneAndUpdate({ _id: req.user.id }, newData, { new: true })
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
            profileImage: user.image_url,
            isAdmin: user.isAdmin
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
