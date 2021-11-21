const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
    name: {
        type: String
    },
    googleID: {
        type: Number
    },
    points: {
        type: Number
    },
    transaction: {
        type: Array
    }
})

const User = mongoose.model('Users', userSchema)

module.exports = User