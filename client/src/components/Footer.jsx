 import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 mt-20">

      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Company */}
        <div>
          <h2 className="text-3xl font-bold text-white">
            CodeAlpha Store
          </h2>

          <p className="mt-4 leading-7 text-gray-400">
            Premium shopping experience with quality products,
            secure payments and fast delivery across India.
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
          <h3 className="text-xl font-semibold text-white mb-5">
            Quick Links
          </h3>

          <ul className="space-y-3">
            <li><a href="/" className="hover:text-blue-400">Home</a></li>
            <li><a href="/cart" className="hover:text-blue-400">Cart</a></li>
            <li><a href="/orders" className="hover:text-blue-400">Orders</a></li>
            <li><a href="/login" className="hover:text-blue-400">Login</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-5">
            Categories
          </h3>

          <ul className="space-y-3">
            <li>Electronics</li>
            <li>Fashion</li>
            <li>Shoes</li>
            <li>Accessories</li>
            <li>Smart Watches</li>
          </ul>
        </div>

        {/* Contact */}
        <div>

          <h3 className="text-xl font-semibold text-white mb-5">
            Contact Us
          </h3>

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

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-slate-700 py-5 text-center text-gray-400">

        © {new Date().getFullYear()} CodeAlpha Store.
        All Rights Reserved.

      </div>

    </footer>
  );
}

export default Footer;