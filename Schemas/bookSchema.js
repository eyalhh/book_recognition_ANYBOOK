const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    title: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    year: {
        type: mongoose.Schema.Types.Number,
        required: true,
    },
    description: mongoose.Schema.Types.String, // optional
})

const bookModel = mongoose.model('Book', bookSchema);

module.exports = bookModel;