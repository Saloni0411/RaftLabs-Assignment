const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    
    title: {type: String},
    isbn: {type: String},
    authors: {type: String},
    description: { type: String}

}, {timestamps: true})

module.exports = mongoose.model("book", bookSchema)