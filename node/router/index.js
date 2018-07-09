const express = require('express'),
    router = express.Router(),
    path = require('path'),
    passport = require('passport'),
    pageDir = "angular/dist";

const userRouter = require('./user'),
    ctrlAuth = require('../controller/auth');

require('../controller/passport');

router.use('/user', passport.authenticate('jwt', {session: false}), userRouter);
router.post('/login', ctrlAuth.login);
router.post('/register', ctrlAuth.register);


//default page
router.use(express.static(path.join(__basedir, pageDir)));

router.get('*', (req, res) => {
    res.sendFile(path.join(__basedir, `${pageDir}/index.html`));
});

module.exports = router;