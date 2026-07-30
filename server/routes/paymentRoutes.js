 const express = require("express");
const router = express.Router();

const {
  createOrder,
  verifyPayment,
  paymentFailed,
} = require("../controllers/paymentController");

const { protect } = require("../middleware/authMiddleware");

// ===============================
// CREATE RAZORPAY ORDER
// ===============================
router.post("/create-order", protect, createOrder);

// ===============================
// VERIFY PAYMENT
// ===============================
router.post("/verify-payment", protect, verifyPayment);

// ===============================
// PAYMENT FAILED
// ===============================
router.post("/payment-failed", protect, paymentFailed);

module.exports = router;