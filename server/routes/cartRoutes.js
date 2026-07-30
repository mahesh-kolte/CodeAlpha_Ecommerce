 const express = require("express");
const router = express.Router();

const {protect} = require("../middleware/authMiddleware");

 const {
  addToCart,
  getCart,
  removeFromCart,
} = require("../controllers/cartController");
console.log("protect:", protect);
console.log({ addToCart, getCart, removeFromCart });

router.post("/", protect, addToCart);
router.get("/", protect, getCart);
router.delete("/:productId", protect, removeFromCart);

module.exports = router;