 import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import AdminLayout from "../../components/Admin/AdminLayout";
import toast from "react-hot-toast";

function AddProduct() {
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
    featured: false,
    bestSeller: false,
    newArrival: true,
    todaysDeal: false,
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please Select Product Image");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", product.name);
      formData.append("brand", product.brand);
      formData.append("category", product.category);
      formData.append("price", product.price);
      formData.append("stock", product.stock);
      formData.append("rating", product.rating);
      formData.append("discount", product.discount);
      formData.append("description", product.description);

      formData.append("featured", product.featured);
      formData.append("bestSeller", product.bestSeller);
      formData.append("newArrival", product.newArrival);
      formData.append("todaysDeal", product.todaysDeal);

      formData.append("image", image);

      await API.post("/products", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product Added Successfully");

      navigate("/admin/products");

    } catch (err) {
      console.log(err);
      toast.error("Failed To Add Product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-slate-800">
            Add New Product
          </h1>

          <p className="text-gray-500 mt-2">
            Create a premium product for your store.
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
      placeholder="49999"
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
      placeholder="100"
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
      placeholder="4.8"
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
      placeholder="20"
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
    placeholder="Write detailed product description..."
    className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
    required
  />
</div>

{/* Product Image */}
<div>
  <label className="block mb-2 font-semibold">
    Product Image
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={handleImage}
    className="w-full border rounded-xl px-4 py-3"
    required
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

          {preview && (
            <div className="flex justify-center">

              <img
                src={preview}
                alt="Preview"
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
              {loading ? "Adding Product..." : "Add Product"}
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

export default AddProduct;
      
        