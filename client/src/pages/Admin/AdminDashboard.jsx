 import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

import AdminLayout from "../../components/Admin/AdminLayout";
import DashboardCard from "../../components/Admin/DashboardCard";
import SalesChart from "../../components/Admin/SalesChart";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

function AdminDashboard() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    fetchProducts();
    fetchStats();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products");
      setProducts(data.products || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStats = async () => {
    try {
      const { data } = await API.get("/admin/stats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setStats(data.stats);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await API.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Product Deleted Successfully");

      fetchProducts();
      fetchStats();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            Admin Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your ecommerce store
          </p>

        </div>

        <button
          onClick={() => navigate("/admin/add-product")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"
        >
          <FaPlus />
          Add Product
        </button>

      </div>

      {/* Dashboard Cards */}

      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <DashboardCard
          title="Products"
          value={stats.totalProducts}
          color="bg-blue-600"
        />

        <DashboardCard
          title="Orders"
          value={stats.totalOrders}
          color="bg-green-600"
        />

        <DashboardCard
          title="Users"
          value={stats.totalUsers}
          color="bg-purple-600"
        />

      </div>

      {/* Quick Actions */}

      <div className="grid md:grid-cols-4 gap-4 mb-8">

        <button
          onClick={() => navigate("/admin/products")}
          className="bg-white shadow rounded-xl p-5 hover:bg-blue-50 transition"
        >
          📦 Manage Products
        </button>

        <button
          onClick={() => navigate("/admin/orders")}
          className="bg-white shadow rounded-xl p-5 hover:bg-yellow-50 transition"
        >
          🛒 Manage Orders
        </button>

        <button
          onClick={() => navigate("/admin/users")}
          className="bg-white shadow rounded-xl p-5 hover:bg-green-50 transition"
        >
          👤 Manage Users
        </button>

        <button
          onClick={() => navigate("/admin/add-product")}
          className="bg-white shadow rounded-xl p-5 hover:bg-red-50 transition"
        >
          ➕ Add Product
        </button>

      </div>

      {/* Search */}

      <div className="relative mb-8">

        <FaSearch className="absolute left-4 top-4 text-gray-500" />

        <input
          type="text"
          placeholder="Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>
      <SalesChart />
            {/* Product Table */}

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-900 text-white">

            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-slate-50 transition"
                >

                  <td className="p-4">

                    <img
                      src={
                        product.image ||
                        "https://via.placeholder.com/80?text=No+Image"
                      }
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />

                  </td>

                  <td className="p-4 font-semibold">
                    {product.name}
                  </td>

                  <td className="p-4">
                    {product.category}
                  </td>

                  <td className="p-4 font-bold text-blue-600">
                    ₹{product.price}
                  </td>

                  <td className="p-4">
                    {product.stock}
                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() =>
                          navigate(`/admin/edit/${product._id}`)
                        }
                        className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg transition"
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() =>
                          deleteProduct(product._id)
                        }
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition"
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </td>

                </tr>
              ))
            ) : (
              <tr>

                <td
                  colSpan="6"
                  className="text-center py-12 text-gray-500 text-lg"
                >
                  No Products Found
                </td>

              </tr>
            )}

          </tbody>

        </table>

      </div>

    </AdminLayout>
  );
}

export default AdminDashboard;