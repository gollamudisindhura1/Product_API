const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGO_URI;

// Connect to MongoDB

mongoose.connect(uri)
        .then(()=>console.log("Successfully connected to MongoDB!"))
        .catch(error => console.error("Connection error", error));
        