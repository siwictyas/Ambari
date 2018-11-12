const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Membuat schema users
const schema = new Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
})

schema.set('toJSON', { virtuals: true })

// Eksport model users
module.exports = mongoose.model('User', schema)