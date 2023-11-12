const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    // Title: {type: String, required: true},
    Title:String,
    Author: String,
    ISBN: Number,
    Description: String,
    PublichedDate: String,
    userName: String,
    userId: String
}, {
    versionKey: false
})

const BookModel = mongoose.model('book', bookSchema)

module.exports = {
    BookModel
}