 import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaUser,
  FaSearch,
  FaStore,
  FaSignOutAlt,
  FaTachometerAlt,
  FaHeart,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaBoxOpen,
} from "react-icons/fa";
import toast from "react-hot-toast";
import API from "../services/api";
import { useSearch } from "../context/SearchContext";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { search, setSearch } = useSearch();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const userMenuRef = useRef(null);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Route बदलली की mobile menu आपोआप बंद कर
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // बाहेर क्लिक केलं की user dropdown बंद कर
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cart / Wishlist count आणणे (fail झालं तरी silently ignore, badge फक्त दिसणार नाही)
  useEffect(() => {
    if (!token) return;

    const fetchCounts = async () => {
      try {
        const cartRes = await API.get("/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const items = cartRes.data.items || cartRes.data.cart?.items || [];
        setCartCount(items.length);
      } catch (err) {
        // silent
      }

      try {
        const wishRes = await API.get("/wishlist", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const items = wishRes.data.items || wishRes.data.wishlist || [];
        setWishlistCount(Array.isArray(items) ? items.length : 0);
      } catch (err) {
        // silent
      }
    };

    fetchCounts();
  }, [token, location.pathname]);

  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logout Successful");
    navigate("/login");
  };

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const navLinkClass = (path) =>
    `relative font-medium transition-colors ${
      isActive(path) ? "text-blue-600" : "text-slate-700 hover:text-blue-600"
    } after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 ${
      isActive(path) ? "after:w-full" : "after:w-0"
    }`;

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-slate-800 shrink-0"
        >
          <FaStore className="text-blue-600" />
          <span>CodeAlpha</span>
        </Link>

        {/* Search (desktop) */}
        <div className="hidden md:flex items-center bg-slate-100 rounded-full px-4 py-2 w-[340px] lg:w-[380px] focus-within:ring-2 focus-within:ring-blue-500 transition">
          <FaSearch className="text-gray-500 mr-3 shrink-0" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-7">
          <Link to="/" className={navLinkClass("/")}>
            Home
          </Link>

          <Link to="/products" className={navLinkClass("/products")}>
            Shop
          </Link>

          {token && (
            <>
              <Link to="/orders" className={navLinkClass("/orders")}>
                Orders
              </Link>

              <Link to="/wishlist" className="relative hover:text-red-500 transition">
                <FaHeart size={20} className="text-red-500" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link to="/cart" className="relative hover:text-blue-600 transition">
                <FaShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </>
          )}

          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="flex items-center gap-2 text-slate-700 hover:text-blue-600 font-medium transition"
            >
              <FaTachometerAlt />
              Admin
            </Link>
          )}

          {token ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen((v) => !v)}
                className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full hover:bg-slate-100 transition"
              >
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                  {initials}
                </span>
                <span className="font-medium text-sm text-slate-700 max-w-[100px] truncate">
                  {user?.name}
                </span>
                <FaChevronDown
                  size={10}
                  className={`text-slate-400 transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
                />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden animate-[fadeIn_0.15s_ease-out]">
                  <Link
                    to="/orders"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition"
                  >
                    <FaBoxOpen className="text-slate-400" />
                    My Orders
                  </Link>
                  <Link
                    to="/wishlist"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition"
                  >
                    <FaHeart className="text-slate-400" />
                    Wishlist
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition border-t border-slate-100"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
              <FaUser />
              Login
            </Link>
          )}
        </div>

        {/* Mobile: cart/wishlist icons + hamburger */}
        <div className="flex lg:hidden items-center gap-4">
          {token && (
            <>
              <Link to="/wishlist" className="relative">
                <FaHeart size={20} className="text-red-500" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link to="/cart" className="relative">
                <FaShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </>
          )}

          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="text-slate-700"
          >
            {mobileOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-6 py-5 space-y-5">
          {/* Search (mobile) */}
          <div className="flex items-center bg-slate-100 rounded-full px-4 py-2">
            <FaSearch className="text-gray-500 mr-3 shrink-0" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>

          <div className="flex flex-col gap-4">
            <Link to="/" className={navLinkClass("/")}>
              Home
            </Link>
            <Link to="/products" className={navLinkClass("/products")}>
              Shop
            </Link>

            {token && (
              <>
                <Link to="/orders" className={navLinkClass("/orders")}>
                  Orders
                </Link>
                <Link to="/wishlist" className={navLinkClass("/wishlist")}>
                  Wishlist
                </Link>
                <Link to="/cart" className={navLinkClass("/cart")}>
                  Cart
                </Link>
              </>
            )}

            {user?.role === "admin" && (
              <Link to="/admin" className="flex items-center gap-2 text-slate-700 font-medium">
                <FaTachometerAlt />
                Admin
              </Link>
            )}
          </div>

          <div className="pt-2 border-t border-slate-100">
            {token ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                    {initials}
                  </span>
                  <span className="font-medium text-sm text-slate-700">{user?.name}</span>
                </div>

                <button
                  onClick={logout}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition text-sm"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                <FaUser />
                Login
              </Link>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;