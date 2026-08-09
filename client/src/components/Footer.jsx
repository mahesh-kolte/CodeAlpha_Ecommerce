 import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaArrowUp,
} from "react-icons/fa";

const categories = ["Laptops", "Mobiles", "Fashion", "Shoes", "Watches", "Accessories"];

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-slate-900 text-gray-300 mt-20">
      {/* Back to top */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className="absolute -top-6 right-6 md:right-10 w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg transition"
      >
        <FaArrowUp />
      </button>

      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Company */}
        <div>
          <h2 className="text-3xl font-bold text-white">CodeAlpha Store</h2>

          <p className="mt-4 leading-7 text-gray-400">
            Premium shopping experience with quality products, secure payments
            and fast delivery across India.
          </p>

          <div className="flex gap-4 mt-6">
            <a
              href="#"
              className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              className="bg-pink-600 hover:bg-pink-700 p-3 rounded-full transition"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="bg-sky-600 hover:bg-sky-700 p-3 rounded-full transition"
            >
              <FaLinkedinIn />
            </a>

            <a
              href="#"
              className="bg-gray-700 hover:bg-gray-800 p-3 rounded-full transition"
            >
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-5">Quick Links</h3>

          <ul className="space-y-3">
            <li><Link to="/" className="hover:text-blue-400 transition">Home</Link></li>
            <li><Link to="/products" className="hover:text-blue-400 transition">Shop</Link></li>
            <li><Link to="/cart" className="hover:text-blue-400 transition">Cart</Link></li>
            <li><Link to="/wishlist" className="hover:text-blue-400 transition">Wishlist</Link></li>
            <li><Link to="/orders" className="hover:text-blue-400 transition">Orders</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-5">Categories</h3>

          <ul className="space-y-3">
            {categories.map((cat) => (
              <li key={cat}>
                <Link
                  to={`/products?category=${encodeURIComponent(cat)}`}
                  className="hover:text-blue-400 transition"
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-5">Contact Us</h3>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-blue-400" />
              <span>Maharashtra, India</span>
            </div>

            <div className="flex items-center gap-3">
              <FaPhone className="text-blue-400" />
              <span>+91 XXXXX XXXXX</span>
            </div>

            <div className="flex items-center gap-3">
              <FaEnvelope className="text-blue-400" />
              <span>support@codealpha.com</span>
            </div>
          </div>

          {/* Payment methods */}
          <div className="mt-6">
            <p className="text-sm text-gray-400 mb-3">We accept</p>
            <div className="flex gap-3 text-3xl text-gray-400">
              <FaCcVisa className="hover:text-blue-400 transition" />
              <FaCcMastercard className="hover:text-orange-400 transition" />
              <FaCcPaypal className="hover:text-sky-400 transition" />
              <span className="text-xs font-bold border border-gray-600 rounded px-2 py-1.5 self-center">
                UPI
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-700 py-5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} CodeAlpha Store. All Rights Reserved.</p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-blue-400 transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;