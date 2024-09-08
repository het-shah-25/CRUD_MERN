const Product = require("../models/Product");

exports.getAllProducts = async () => {
  return await Product.find();
};

exports.getProductById = async (id) => {
  return await Product.findById(id);
};

exports.createProduct = async (productData) => {
  const product = new Product({
    ...productData,
    img: productData.img, // Directly use the image URL
  });
  return await product.save();
};

exports.updateProduct = async (id, productData) => {
  // Create an object to hold the updated fields
  const updatedData = { ...productData };

  // Only add the image URL if it's provided
  if (productData.img) {
    updatedData.img = productData.img;
  }

  // Update the product in the database and return the updated document
  return await Product.findByIdAndUpdate(id, updatedData, { new: true });
};

exports.deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};
