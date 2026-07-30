 const Product = require("../models/Product");

// ================= ADD PRODUCT =================

 // ================= ADD PRODUCT =================

exports.addProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      category,
      price,
      stock,
      rating,
      discount,
      description,
      featured,
      bestSeller,
      newArrival,
      todaysDeal,
    } = req.body;

    const product = await Product.create({
      name,
      brand,
      category,
      price,
      stock,
      rating,
      discount,
      description,

      featured: featured === "true",
      bestSeller: bestSeller === "true",
      newArrival: newArrival === "true",
      todaysDeal: todaysDeal === "true",

      image: req.file ? req.file.path : "",
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ALL PRODUCTS =================

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET SINGLE PRODUCT =================

exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= UPDATE PRODUCT =================

exports.updateProduct = async (req, res) => {
  try {
    const updateData = {
  ...req.body,
};

if (updateData.featured !== undefined) {
  updateData.featured = updateData.featured === "true";
}

if (updateData.bestSeller !== undefined) {
  updateData.bestSeller = updateData.bestSeller === "true";
}

if (updateData.newArrival !== undefined) {
  updateData.newArrival = updateData.newArrival === "true";
}

if (updateData.todaysDeal !== undefined) {
  updateData.todaysDeal = updateData.todaysDeal === "true";
}

if (req.file) {
  updateData.image = req.file.path;
}

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= DELETE PRODUCT =================

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};