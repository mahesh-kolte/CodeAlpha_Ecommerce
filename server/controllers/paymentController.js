 const Razorpay = require("razorpay");
const crypto = require("crypto");

// Razorpay Instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// ===============================
// CREATE RAZORPAY ORDER
// ===============================
exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid Amount",
      });
    }

    const options = {
      amount: Number(amount) * 100, // Convert ₹ to Paisa
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Create Order Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to create payment order",
    });
  }
};

// ===============================
// VERIFY PAYMENT
// ===============================
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment details missing",
      });
    }

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(
        razorpay_order_id + "|" + razorpay_payment_id
      )
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment Verification Failed",
      });
    }

    // Payment Verified Successfully
    // Later we will save order in database

    res.status(200).json({
      success: true,
      message: "Payment Verified Successfully",
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    });

  } catch (error) {

    console.error("Verify Payment Error:", error);

    res.status(500).json({
      success: false,
      message: "Payment Verification Error",
    });

  }
};

// ===============================
// PAYMENT FAILED
// ===============================
exports.paymentFailed = async (req, res) => {
  try {

    res.status(400).json({
      success: false,
      message: "Payment Failed",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};