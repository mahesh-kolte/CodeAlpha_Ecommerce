const express = require("express");
const router = express.Router();
const admin = require("../middleware/adminMiddleware");
const {protect} = require("../middleware/authMiddleware");

const {
  createOrder,
  getMyOrders,
  getAllOrders,
} = require("../controllers/orderController");

router.get("/all", protect, admin, getAllOrders);

router.post("/", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);

module.exports = router;
