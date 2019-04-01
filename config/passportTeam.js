const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");

const Team = mongoose.model("team");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secret;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      Team.findById(jwt_payload.id)
        .then(user => {
          if (user) return done(null, user);
        })
        .catch(err => console.log(err));
    })
  );
};
