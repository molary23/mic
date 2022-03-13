const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt,
  User = require("../db/models/User"),
  keys = require("./keys"),
  opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

opts.secretOrKey = keys.secretOrKey;
module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findByPk(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
        })
        .catch((err) => res.status(401).json({ error: err }));
    })
  );
};
