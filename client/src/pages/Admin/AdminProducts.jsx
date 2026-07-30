 import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import AdminLayout from "../../components/Admin/AdminLayout";
import toast from "react-hot-toast";

import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaStar,
  FaSyncAlt,
} from "react-icons/fa";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);

    try {
      const { data } = await API.get("/products");

      setProducts(data.products || []);
    } catch (err) {
      console.log(err);
      toast.error("Failed To Load Products");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await API.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success("Product Deleted Successfully");

      fetchProducts();
    } catch (err) {
      console.log(err);
      toast.error("Failed To Delete Product");
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      (product.brand || "")
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" ||
      product.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <AdminLayout>

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Product Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all products in your ecommerce store.
          </p>
        </div>

        <div className="flex gap-3">

          <button
            onClick={fetchProducts}
            className="bg-gray-200 hover:bg-gray-300 px-5 py-3 rounded-xl flex items-center gap-2 transition"
          >
            <FaSyncAlt />
            Refresh
          </button>

          <Link
            to="/admin/add-product"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition"
          >
            <FaPlus />
            Add Product
          </Link>

        </div>

      </div>

      {/* Search & Filter */}

      <div className="grid md:grid-cols-2 gap-5 mb-8">

        <div className="relative">

          <FaSearch className="absolute left-4 top-4 text-gray-500" />

          <input
            type="text"
            placeholder="Search by Product or Brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Categories</option>

          {[...new Set(products.map((p) => p.category))].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}

        </select>

      </div>

      {/* Table starts here */}
            <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">

        {loading ? (

          <div className="py-20 text-center text-gray-500 text-lg">
            Loading Products...
          </div>

        ) : (

          <table className="w-full">

            <thead className="bg-slate-900 text-white">

              <tr>

                <th className="p-4 text-left">Image</th>
                <th className="p-4 text-left">Product</th>
                <th className="p-4 text-left">Brand</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Stock</th>
                <th className="p-4 text-left">Rating</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Actions</th>

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
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 rounded-xl object-cover border"
                      />
                    </td>

                    <td className="p-4 font-semibold">
                      {product.name}
                    </td>

                    <td className="p-4">
                      {product.brand || "-"}
                    </td>

                    <td className="p-4">
                      {product.category}
                    </td>

                    <td className="p-4">

                      <div className="font-bold text-blue-600">
                        ₹{product.price}
                      </div>

                      {product.discount > 0 && (

                        <span className="inline-block mt-1 bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-semibold">
                          {product.discount}% OFF
                        </span>

                      )}

                    </td>

                    <td className="p-4">

                      {product.stock > 20 ? (

                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                          In Stock ({product.stock})
                        </span>

                      ) : product.stock > 0 ? (

                        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                          Low Stock ({product.stock})
                        </span>

                      ) : (

                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                          Out of Stock
                        </span>

                      )}

                    </td>

                    <td className="p-4">

                      <div className="flex items-center gap-1">

                        <FaStar className="text-yellow-500" />

                        <span>
                          {product.rating || 5}
                        </span>

                      </div>

                    </td>

                    <td className="p-4">

                      <div className="flex flex-wrap gap-2">

                        {product.featured && (
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                            Featured
                          </span>
                        )}

                        {product.bestSeller && (
                          <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">
                            Best Seller
                          </span>
                        )}

                        {product.newArrival && (
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                            New
                          </span>
                        )}

                        {product.todaysDeal && (
                          <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
                            Deal
                          </span>
                        )}

                      </div>

                    </td>

                    <td className="p-4">

                      <div className="flex gap-3">

                        <Link
                          to={`/admin/edit-product/${product._id}`}
                          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition"
                        >
                          <FaEdit />
                        </Link>

                        <button
                          onClick={() => deleteProduct(product._id)}
                          className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg transition"
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
                    colSpan="9"
                    className="text-center py-16"
                  >

                    <div className="flex flex-col items-center">

                      <img
                        src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                        alt="No Products"
                        className="w-28 h-28 mb-4 opacity-70"
                      />

                      <h2 className="text-2xl font-bold text-gray-700">
                        No Products Found
                      </h2>

                      <p className="text-gray-500 mt-2">
                        Try changing the search or category filter.
                      </p>

                    </div>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        )}

      </div>

    </AdminLayout>
  );
}

export default AdminProducts;