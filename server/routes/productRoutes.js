const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const upload = require("../middleware/upload");

const {
  addProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// ================= PUBLIC ROUTES =================

// Get All Products
router.get("/", getProducts);

// Get Single Product
router.get("/:id", getSingleProduct);

// ================= ADMIN ROUTES =================

// Add Product
router.post(
  "/",
  protect,
  admin,
  upload.single("image"),
  addProduct
);

// Update Product
router.put(
  "/:id",
  protect,
  admin,
  upload.single("image"),
  updateProduct
);

// Delete Product
router.delete(
  "/:id",
  protect,
  admin,
  deleteProduct
);

module.exports = router;