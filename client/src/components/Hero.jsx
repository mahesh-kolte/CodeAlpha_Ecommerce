 import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaShippingFast,
  FaLock,
  FaUndoAlt,
} from "react-icons/fa";

function Hero() {
  return (
    <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 flex flex-col-reverse lg:flex-row items-center justify-between gap-14">

        {/* Left Side */}
        <div className="max-w-xl">

          <span className="inline-block bg-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-5">
            🔥 New Collection 2026
          </span>

          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
            Discover Your
            <br />
            <span className="text-blue-400">
              Perfect Shopping
            </span>
            <br />
            Experience
          </h1>

          <p className="text-gray-300 mt-6 text-lg leading-8">
            Shop premium quality products with secure payment,
            fast delivery and unbeatable prices.
          </p>

          <div className="flex gap-4 mt-8 flex-wrap">

            <Link
              to="/"
              className="bg-blue-600 hover:bg-blue-700 px-7 py-3 rounded-xl font-semibold flex items-center gap-2 transition duration-300"
            >
              Shop Now
              <FaArrowRight />
            </Link>

            <Link
              to="/orders"
              className="border border-white hover:bg-white hover:text-slate-900 px-7 py-3 rounded-xl font-semibold transition duration-300"
            >
              My Orders
            </Link>

          </div>

          {/* Features */}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-12">

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center">
              <FaShippingFast
                className="mx-auto text-3xl text-blue-400 mb-3"
              />
              <p className="font-semibold">
                Free Delivery
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center">
              <FaLock
                className="mx-auto text-3xl text-green-400 mb-3"
              />
              <p className="font-semibold">
                Secure Payment
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center">
              <FaUndoAlt
                className="mx-auto text-3xl text-yellow-400 mb-3"
              />
              <p className="font-semibold">
                Easy Returns
              </p>
            </div>

          </div>

        </div>

        {/* Right Side */}

        <div className="relative">

          <div className="absolute -inset-5 bg-blue-500 blur-3xl opacity-20 rounded-full"></div>

          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&auto=format&fit=crop"
            alt="Premium Product"
            className="relative w-full max-w-xl rounded-[2rem] shadow-2xl shadow-slate-950/40"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
