 const Cart = require("../models/Cart");

// Add To Cart
 const addToCart = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("USER:", req.user);

    const { productId } = req.body;

    console.log("STEP 1");

    let cart = await Cart.findOne({ user: req.user.id });

    console.log("STEP 2", cart);

    if (!cart) {
      console.log("STEP 3");

      cart = new Cart({
        user: req.user.id,
        items: [
          {
            product: productId,
            quantity: 1,
          },
        ],
      });
    } else {
      console.log("STEP 4");

      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.items.push({
          product: productId,
          quantity: 1,
        });
      }
    }

    console.log("STEP 5");
console.log("CART OBJECT:");
console.log(JSON.stringify(cart, null, 2));
    await cart.save();

    console.log("STEP 6");

    res.json({
      success: true,
      cart,
    });
  } catch (error) {
    console.error("ERROR =>", error);
console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product"
    );

    res.status(200).json({
      success: true,
      cart: cart ? cart.items : [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Remove From Cart
const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== req.params.productId
    );

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Product removed",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
};