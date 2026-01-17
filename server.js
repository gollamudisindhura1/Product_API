const express = require("express");
require("dotenv").config();

const connectDB = require("./db/connection");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = process.env.PORT || 3001;



// Middleware
app.use(express.json());
app.use(express.urlencoded())

// Database connection
connectDB();

// Routes
app.use("/api/products", productRoutes);


// Server start

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});