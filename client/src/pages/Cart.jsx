 import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setCart(res.data.cart || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load cart");
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await API.delete(`/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success("Item removed from cart");
      fetchCart();
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove item");
    }
  };

  // Remove invalid items (product deleted)
  const validCart = cart.filter((item) => item.product);

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">My Cart</h1>

      {validCart.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold text-gray-600">
            Your Cart is Empty
          </h2>

          <Link
            to="/"
            className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          {validCart.map((item) => (
            <div
              key={item.product._id}
              className="border rounded-lg p-5 mb-5 flex justify-between items-center shadow-sm"
            >
              <div>
                <h2 className="text-xl font-semibold">
                  {item.product.name}
                </h2>

                <p className="text-gray-600">
                  ₹ {item.product.price}
                </p>

                <p className="text-gray-500">
                  Quantity : {item.quantity}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => removeFromCart(item.product._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>

                <Link
                  to="/checkout"
                  state={{ cart: validCart }}
                >
                  <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded">
                    Checkout
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Cart;