import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaPlus,
} from "react-icons/fa";

function AdminSidebar() {
  const location = useLocation();

  const menus = [
    {
      name: "Dashboard",
      icon: <FaTachometerAlt />,
      path: "/admin",
    },
    {
      name: "Products",
      icon: <FaBox />,
      path: "/admin/products",
    },
    {
      name: "Add Product",
      icon: <FaPlus />,
      path: "/admin/add-product",
    },
    {
      name: "Orders",
      icon: <FaShoppingCart />,
      path: "/admin/orders",
    },
    {
      name: "Users",
      icon: <FaUsers />,
      path: "/admin/users",
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-6">

      <h2 className="text-3xl font-bold mb-10">
        Admin Panel
      </h2>

      <div className="space-y-3">

        {menus.map((menu) => (
          <Link
            key={menu.path}
            to={menu.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              location.pathname === menu.path
                ? "bg-blue-600"
                : "hover:bg-slate-800"
            }`}
          >
            {menu.icon}
            {menu.name}
          </Link>
        ))}

      </div>

    </aside>
  );
}

export default AdminSidebar;