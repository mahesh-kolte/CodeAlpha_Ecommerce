 import { Link } from "react-router-dom";
import { FaShoppingCart, FaEye, FaStar } from "react-icons/fa";
import API from "../services/api";
import { FaHeart } from "react-icons/fa";
function ProductCard({ product }) {
  const addToCart = async (id) => {
    try {
      await API.post(
        "/cart",
        { productId: id, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Product added to cart");
    } catch (error) {
      console.error(error);
      alert("Failed to add product");
    }
  };
  const addWishlist = async () => {

  try {

    await API.post(
      "/wishlist",
      {
        productId: product._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    toast.success("Added To Wishlist ❤️");

  } catch (err) {

    toast.error("Already Added");

  }

};

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group">

      {/* Product Image */}
      <div className="overflow-hidden bg-gray-100">
        <img
          src={product.image || "https://via.placeholder.com/600x600?text=No+Image"}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
        />
        <button
  onClick={addWishlist}
  className="absolute top-3 right-3 bg-white p-3 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition"
>
  <FaHeart />
</button>
      </div>

      {/* Product Details */}
      <div className="p-5">

        <h2 className="text-xl font-bold text-slate-800 line-clamp-1">
          {product.name}
        </h2>

        <p className="text-gray-500 text-sm mt-2 line-clamp-2 min-h-[48px]">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-3">
          {[1, 2, 3, 4, 5].map((item) => (
            <FaStar
              key={item}
              className="text-yellow-400 text-sm"
            />
          ))}

          <span className="text-sm text-gray-500 ml-2">
            (5.0)
          </span>
        </div>

        {/* Price */}
        <div className="mt-4">
          <span className="text-3xl font-bold text-blue-600">
            ₹{product.price}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">

          <Link
            to={`/product/${product._id}`}
            className="flex-1 border border-blue-600 text-blue-600 rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition"
          >
            <FaEye />
            View
          </Link>

          <button
            onClick={() => addToCart(product._id)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 flex items-center justify-center gap-2 transition"
          >
            <FaShoppingCart />
            Cart
          </button>

        </div>

      </div>
    </div>
  );
}

export default ProductCard;