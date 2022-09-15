const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({

    firstname : {type: String},
    lastname: {type: String},
    email: {type: String}

}, {timestamps: true})

module.exports = mongoose.model("author", authorSchema)