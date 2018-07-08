const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);