// http://www.passportjs.org/docs/profile/

const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    provider: { // Where the user authenticated from (Google, Github)
        type: String,
    },
    provider_id: { // The user id from the provider
        type: String,
    },
    displayName: {
        type: String,
        required: true
    },
    name: {
        familyName: String,
        givenName: String,
        middleName: String
    },
    photos: [{
        value: String
    }],
    pages: [{
        name: String,
        css: String,
        html: String
    }],
    username: {
        type: String
    }
}, {
    timestamps: true
})
User = mongoose.model('user', UserSchema)
module.exports = User