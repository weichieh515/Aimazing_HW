const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    jwt = require('jsonwebtoken');
var crypto = require('crypto');


var MangerSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hash: String,
    salt: String,
});

MangerSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

MangerSchema.methods.validPassword = function (password) {
    let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

MangerSchema.methods.generateJwt = function () {
    let expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 20);
    return jwt.sign({
        _id: this._id,
        username: this.username,
        exp: parseInt(expiry.getTime() / 1000),
    }, "THIS_IS_SECRET"); 
};

module.exports = mongoose.model('Manger', MangerSchema);