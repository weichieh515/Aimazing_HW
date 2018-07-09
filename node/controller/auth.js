const passport = require('passport'),
    Manger = require('../model/manger');


module.exports = {
    register: (req, res) => {
        let manger = new Manger({ username: req.body.username });
        manger.setPassword(req.body.password);
        manger.save((err) => {
            if (err) return res.status(409).json({ message: "username already exists" });
            res.json(manger.generateJwt());
        });
    },
    login: (req, res, next) => {
        passport.authenticate('local', { session: false }, (err, manger, info) => {
            if (err) return next(err);
            if (!manger) return res.status(401).json({ messsage: "username or password is incorrect" });
            req.login(manger, { session: false }, (err) => {
                if (err) res.send(err);
                return res.json(manger.generateJwt());
            });
        })(req, res, next);
    }

}


