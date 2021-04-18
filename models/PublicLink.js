const mongoose = require('mongoose')

const PublicLinkSchema = new mongoose.Schema({
    publiclink: String
})

PublicLink = mongoose.model('publiclink', PublicLinkSchema)
module.exports = PublicLink