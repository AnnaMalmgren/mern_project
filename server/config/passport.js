
import JwtStrategy from 'passport-jwt'
import User from '../models/user.js'
import './settings.js'

const jwtStrategy =JwtStrategy.Strategy
const extractJwt = JwtStrategy.ExtractJwt;

export const auth = (passport) => {
    const opts = {};
    opts.jwtFromRequest = extractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = settings.secret;
    passport.use(new jwtStrategy(opts, function (jwt_payload, done) {
        User.findOne({ id: jwt_payload.id }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};