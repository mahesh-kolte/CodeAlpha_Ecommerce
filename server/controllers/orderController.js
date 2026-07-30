 const Order = require("../models/Order");
const Cart = require("../models/Cart");

// ===============================
// CREATE ORDER
// ===============================
exports.createOrder = async (req, res) => {
  try {
    const {
      items,
      totalPrice,
      address,
      paymentMethod,
      paymentId,
      paymentStatus,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    if (!address || address.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Delivery address is required",
      });
    }

    const order = await Order.create({
      user: req.user.id,
      items,
      totalPrice,
      address,
      paymentMethod: paymentMethod || "COD",
      paymentId: paymentId || "",
      paymentStatus: paymentStatus || "Pending",
    });

    // Clear Cart
    await Cart.deleteOne({ user: req.user.id });

    res.status(201).json({
      success: true,
      message: "Order Placed Successfully",
      order,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ===============================
// GET MY ORDERS
// ===============================
exports.getMyOrders = async (req, res) => {
  try {

    const orders = await Order.find({
      user: req.user.id,
    })
      .populate("items.product");

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ===============================
// GET ALL ORDERS
// ===============================
exports.getAllOrders = async (req, res) => {
  try {

    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product", "name price image");

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};