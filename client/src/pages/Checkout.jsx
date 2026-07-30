 import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";
import { loadRazorpay } from "../utils/loadRazorpay";

function Checkout() {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Razorpay");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const { data } = await API.get("/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setCart(data.cart || []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load cart");
    }
  };

  const validCart = cart.filter((item) => item.product);

  const total = validCart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handlePayment = async () => {
    if (validCart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!address.trim()) {
      toast.error("Please enter delivery address");
      return;
    }

    // ===========================
    // CASH ON DELIVERY
    // ===========================
    if (paymentMethod === "COD") {
      try {
        const items = validCart.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        }));

        const { data } = await API.post(
          "/orders",
          {
            items,
            totalPrice: total,
            address,
            paymentMethod: "COD",
            paymentStatus: "Pending",
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        toast.success(data.message);

        setCart([]);
        setAddress("");

        navigate("/orders");
        return;
      } catch (err) {
        console.log(err);
        toast.error("Order Failed");
        return;
      }
    }

    // ===========================
    // RAZORPAY
    // ===========================

    setLoading(true);

    try {
      const loaded = await loadRazorpay(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!loaded) {
        toast.error("Unable to load Razorpay SDK");
        return;
      }

      const { data } = await API.post(
        "/payment/create-order",
        {
          amount: total,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!data.success) {
        toast.error("Unable to create payment");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: data.order.amount,

        currency: data.order.currency,

        order_id: data.order.id,

        name: "ShopEase",

        description: "Secure Payment",

        theme: {
          color: "#2563eb",
        },

        handler: async function (response) {
  try {
    const verify = await API.post(
      "/payment/verify-payment",
      {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!verify.data.success) {
      toast.error("Payment Verification Failed");
      return;
    }

    const items = validCart.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    }));

    const { data } = await API.post(
      "/orders",
      {
        items,
        totalPrice: total,
        address,
        paymentMethod: "Razorpay",
        paymentId: response.razorpay_payment_id,
        paymentStatus: "Paid",
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    toast.success(data.message);

    setCart([]);
    setAddress("");

    navigate("/payment-success");
  } catch (err) {
    console.log(err);
    toast.error("Payment Verification Failed");
  }
},

        modal: {
          ondismiss: function () {
            toast.error("Payment Cancelled");
          },
        },
      };

      if (!window.Razorpay) {
        toast.error("Razorpay SDK not loaded");
        return;
      }

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", async function () {
        toast.error("Payment Failed");

        try {
          await API.post(
            "/payment/payment-failed",
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
        } catch (err) {
          console.log(err);
        }
      });

      razorpay.open();
    } catch (err) {
      console.log(err);
      toast.error("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <h1 className="text-3xl font-bold">Checkout</h1>

          <div>
            <label className="block text-sm font-medium mb-2">
              Delivery Address
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="3"
              placeholder="Enter your delivery address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Payment Method
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="payment"
                  value="Razorpay"
                  checked={paymentMethod === "Razorpay"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                Razorpay
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                Cash on Delivery
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 h-fit mt-6">
          <h2 className="text-2xl font-bold mb-6">
            Order Summary
          </h2>

          {validCart.length === 0 ? (
            <p className="text-center text-gray-500">
              Your cart is empty.
            </p>
          ) : (
            <>
              {validCart.map((item) => (
                <div
                  key={item.product._id}
                  className="flex justify-between mb-3"
                >
                  <span>
                    {item.product.name} × {item.quantity}
                  </span>

                  <span>
                    ₹{item.product.price * item.quantity}
                  </span>
                </div>
              ))}

              <hr className="my-6" />

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full mt-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white text-lg font-semibold transition"
              >
                {loading
                  ? "Processing..."
                  : paymentMethod === "COD"
                  ? "Place COD Order"
                  : "Pay with Razorpay"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;