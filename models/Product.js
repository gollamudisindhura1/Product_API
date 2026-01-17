const mongoose = require('mongoose')
const { Schema } = mongoose

// create the new schema for Product

const productSchema = new Schema({

    name: {
        type: String,
        required: true,
        message: "Name is required."
    }

})