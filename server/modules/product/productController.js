const Product = require("../../models/Product");

const createProduct = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "Please enter product details" });
    }
    // Add a new product
    const product = new Product(req.body);

    // Save the product to the database
    const newProduct = await product.save();

    // console.warn('Product add:', result);
    return res.status(201).json({ message: "Product added", newProduct });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
console.log('page :', page);
console.log('limit:',limit);

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    const products = await Product.find().skip(skip).limit(limit);
    console.log('products :', products);

    // Get total number of documents
    const total = await Product.countDocuments();

    if (products.length > 0) {
      return res
        .status(200)
        .json({
          message: "Products successfully fetch",
          page,
          limit,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          products,
        });
    } else {
      return res.status(404).json({ message: "Products not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "error", error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Ensure a valid MongoDB ObjectId is provided
    if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    // Delete product
    const result = await Product.deleteOne({ _id: productId });

    // Check if a product was deleted
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "error", error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Ensure a valid MongoDB ObjectId is provided
    if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    // Update product
    const result = await Product.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );

    res.status(200).json({ message: "Product update successfully", result });
  } catch (error) {
    return res.status(400).json({ message: "error", error: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Ensure a valid MongoDB ObjectId is provided
    if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    const result = await Product.findOne({ _id: productId });

    if (result) {
      console.log("result", result);
      return res
        .status(200)
        .json({ message: "Product found", product: result });
    } else {
      return res.status(400).json({ message: "Product not found", result });
    }
  } catch (error) {
    return res.status(400).json({ message: "error", error: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProduct,
  deleteProduct,
  updateProduct,
  getProduct,
};
