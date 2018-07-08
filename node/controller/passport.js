const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    JWTStrategy = require("passport-jwt").Strategy,
    ExtractJWT = require("passport-jwt").ExtractJwt,
    Manger = require('../model/manger');


passport.use(new LocalStrategy(
    (username, password, done) => {
        Manger.findOne({ username: username }, (err, manger) => {

            if (err) return done(err);
            if (!manger) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!manger.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, manger);
        });
    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'THIS_IS_SECRET'
}, (jwtPayload, next) => {
    return Manger.findOne({
        _id: jwtPayload._id
    }, (err, result) => {
        if (err) return next(err);
        return next(null, result);
    })
}
));