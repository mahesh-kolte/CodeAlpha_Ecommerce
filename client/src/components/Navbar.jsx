 import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaUser,
  FaSearch,
  FaStore,
  FaSignOutAlt,
  FaTachometerAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { useSearch } from "../context/SearchContext";
import { FaHeart } from "react-icons/fa";

 function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
const { search, setSearch } = useSearch();

  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logout Successful");

    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-slate-800"
        >
          <FaStore className="text-blue-600" />
          <span>CodeAlpha</span>
        </Link>

        {/* Search */}
        <div className="hidden md:flex items-center bg-slate-100 rounded-full px-4 py-2 w-[380px]">
          <FaSearch className="text-gray-500 mr-3" />
           <input
  type="text"
  placeholder="Search products..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="bg-transparent outline-none w-full"
/>
        </div>

        {/* Menu */}
        <div className="flex items-center gap-6">

          <Link to="/" className="hover:text-blue-600 font-medium">
            Home
          </Link>

          {token && (
            <>
              <Link to="/orders" className="hover:text-blue-600 font-medium">
                Orders
              </Link>

              <Link
                to="/cart"
                className="relative hover:text-blue-600"
              >
                <FaShoppingCart size={22} />
              </Link>
            </>
          )}

          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="flex items-center gap-2 hover:text-blue-600"
            >
              <FaTachometerAlt />
              Admin
            </Link>

            
          )}

          {token ? (
            <>
              <div className="flex items-center gap-2">
                <FaUser />
                <span className="font-medium">
                  {user?.name}
                </span>
              </div>

              <button
                onClick={logout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
              <FaUser />
              Login
            </Link>
          )}
          <Link
  to="/wishlist"
  className="relative"
>
  <FaHeart
    size={22}
    className="text-red-500"
  />
</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;