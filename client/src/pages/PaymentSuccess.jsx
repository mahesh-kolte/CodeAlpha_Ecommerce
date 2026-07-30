import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

function PaymentSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-md w-full">

        <FaCheckCircle
          className="text-green-500 mx-auto mb-6"
          size={80}
        />

        <h1 className="text-3xl font-bold mb-4">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-600 mb-8">
          Thank you for your purchase.
          Your order has been placed successfully.
        </p>

        <Link
          to="/orders"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition"
        >
          View My Orders
        </Link>

      </div>
    </div>
  );
}

export default PaymentSuccess;