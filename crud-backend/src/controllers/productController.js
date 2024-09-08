const productService = require("../services/productService");
const { validateProduct } = require("../validators/productValidator");

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json({
      status: 200,
      message: "Products retrieved successfully",
      data: products,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "An error occurred while retrieving products",
      error: err.message,
    });
  }
};

// Get product by ID
exports.getProduct = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({
        status: 404,
        message: "Product not found",
      });
    }
    res.status(200).json({
      status: 200,
      message: "Product retrieved successfully",
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "An error occurred while retrieving the product",
      error: err.message,
    });
  }
};

// Create a product
exports.createProduct = async (req, res) => {
  try {
    const { error } = validateProduct(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.details[0].message,
      });
    }

    // Directly use the image URL from the request body
    const newProduct = await productService.createProduct(req.body);
    res.status(201).json({
      status: 201,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "An error occurred while creating the product",
      error: err.message,
    });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    // Validate the request body
    const { error } = validateProduct(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.details[0].message,
      });
    }

    // Call the service to update the product
    const updatedProduct = await productService.updateProduct(
      req.params.id,
      req.body
    );

    // Check if the product was found and updated
    if (!updatedProduct) {
      return res.status(404).json({
        status: 404,
        message: "Product not found",
      });
    }

    // Return the updated product details
    res.status(200).json({
      status: 200,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (err) {
    // Handle any errors that occurred during the update process
    res.status(500).json({
      status: 500,
      message: "An error occurred while updating the product",
      error: err.message,
    });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await productService.deleteProduct(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({
        status: 404,
        message: "Product not found",
      });
    }
    res.status(200).json({
      status: 200,
      message: "Product deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "An error occurred while deleting the product",
      error: err.message,
    });
  }
};
