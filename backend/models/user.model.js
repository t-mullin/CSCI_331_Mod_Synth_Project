
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = Schema({
    username: {
        type: String,
        required: true,
        uniquie: true,
        trim: true,
        minlength: 3
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;