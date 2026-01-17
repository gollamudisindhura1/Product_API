const express = require("express")
const Product = require("../models/Product")

const router = express.Router();

// CREATE PRODUCT
router.post("/", async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({
        error: error.message
      });
    }
  });

  // READ SINGLE PRODUCT
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE PRODUCT
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE PRODUCT
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//READ ALL PRODUCTS WITH FILTERING, SORTING& PAGINATION

router.get("/", async (req, res)=>{
    try{
        const {
      category,
      minPrice,
      maxPrice,
      sortBy,
      page = 1,
      limit = 10
      } = req.query;

      const query={};

       // Filtering
    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = minPrice;
      if (maxPrice) query.price.$lte = maxPrice;
    }

    // Sorting
    let sortOption = {};
    if (sortBy === "price_asc") {
      sortOption.price = 1;
    } else if (sortBy === "price_desc") {
      sortOption.price = -1;
    }

    const products = await Product.find(query)
          .sort(sortOption)
          .skip((page-1)*limit)
          .limit(Number(limit));
    res.json(products)
    }catch(error){
        res.status(500).json({ error: error.message });

    }
})
module.exports = router;