 import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../services/api";
import AdminLayout from "../../components/Admin/AdminLayout";
import toast from "react-hot-toast";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    stock: "",
    rating: 5,
    discount: 0,
    description: "",
    image: "",

    featured: false,
    bestSeller: false,
    newArrival: true,
    todaysDeal: false,
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const { data } = await API.get(`/products/${id}`);

      setProduct({
        name: data.product.name || "",
        brand: data.product.brand || "",
        category: data.product.category || "",
        price: data.product.price || "",
        stock: data.product.stock || "",
        rating: data.product.rating || 5,
        discount: data.product.discount || 0,
        description: data.product.description || "",
        image: data.product.image || "",

        featured: data.product.featured || false,
        bestSeller: data.product.bestSeller || false,
        newArrival: data.product.newArrival || false,
        todaysDeal: data.product.todaysDeal || false,
      });

    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch product");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await API.put(`/products/${id}`, product, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success("Product Updated Successfully");

      navigate("/admin/products");

    } catch (err) {
      console.log(err);
      toast.error("Update Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-slate-800">
            Edit Product
          </h1>

          <p className="text-gray-500 mt-2">
            Update your product information.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
                    {/* Product Name */}

          <div>
            <label className="block mb-2 font-semibold">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Enter Product Name"
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Brand & Category */}

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="block mb-2 font-semibold">
                Brand
              </label>

              <input
                type="text"
                name="brand"
                value={product.brand}
                onChange={handleChange}
                placeholder="Apple, Samsung, Nike..."
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={product.category}
                onChange={handleChange}
                placeholder="Electronics"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

          </div>

          {/* Price & Stock */}

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="block mb-2 font-semibold">
                Price (₹)
              </label>

              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Stock
              </label>

              <input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

          </div>

          {/* Rating & Discount */}

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="block mb-2 font-semibold">
                Rating
              </label>

              <input
                type="number"
                name="rating"
                min="0"
                max="5"
                step="0.1"
                value={product.rating}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Discount (%)
              </label>

              <input
                type="number"
                name="discount"
                min="0"
                max="100"
                value={product.discount}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

          </div>

          {/* Description */}

          <div>
            <label className="block mb-2 font-semibold">
              Description
            </label>

            <textarea
              rows="5"
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Enter Product Description"
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Image URL */}

          <div>
            <label className="block mb-2 font-semibold">
              Image URL
            </label>

            <input
              type="text"
              name="image"
              value={product.image}
              onChange={handleChange}
              placeholder="Cloudinary Image URL"
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
                    {/* Product Status */}

          <div>
            <label className="block mb-4 font-semibold text-lg">
              Product Status
            </label>

            <div className="grid md:grid-cols-2 gap-4">

              <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  name="featured"
                  checked={product.featured}
                  onChange={handleChange}
                />
                <span>⭐ Featured Product</span>
              </label>

              <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  name="bestSeller"
                  checked={product.bestSeller}
                  onChange={handleChange}
                />
                <span>🏆 Best Seller</span>
              </label>

              <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  name="newArrival"
                  checked={product.newArrival}
                  onChange={handleChange}
                />
                <span>🆕 New Arrival</span>
              </label>

              <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  name="todaysDeal"
                  checked={product.todaysDeal}
                  onChange={handleChange}
                />
                <span>🔥 Today's Deal</span>
              </label>

            </div>
          </div>

          {/* Image Preview */}

          {product.image && (
            <div className="flex justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-64 h-64 object-cover rounded-2xl shadow-lg border"
              />
            </div>
          )}

          {/* Buttons */}

          <div className="flex gap-4 pt-4">

            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 rounded-xl font-semibold text-white transition ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Updating..." : "Update Product"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="bg-gray-200 hover:bg-gray-300 px-8 py-3 rounded-xl font-semibold transition"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </AdminLayout>
  );
}

export default EditProduct;
      