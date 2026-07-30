 import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaShoppingCart,
  FaStar,
  FaTruck,
  FaShieldAlt,
} from "react-icons/fa";
import API from "../services/api";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const { data } = await API.get(`/products/${id}`);
      setProduct(data.product);
    } catch (err) {
      console.log(err);
    }
  };

  const addToCart = async () => {
    try {
      await API.post(
        "/cart",
        {
          productId: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Product Added Successfully");
    } catch (err) {
      console.log(err);
      alert("Failed to add product");
    }
  };

  if (!product) {
    return (
      <div className="text-center py-20 text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">

      <div className="grid lg:grid-cols-2 gap-14 items-center">

        {/* Image */}

        <div>

          <img
            src={
              product.image ||
              "https://via.placeholder.com/600x600?text=No+Image"
            }
            alt={product.name}
            className="rounded-3xl shadow-xl w-full"
          />

        </div>

        {/* Details */}

        <div>

          <h1 className="text-5xl font-bold text-slate-800">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 mt-5">

            {[1,2,3,4,5].map((item)=>(
              <FaStar
                key={item}
                className="text-yellow-400"
              />
            ))}

            <span className="text-gray-500">
              (5.0 Reviews)
            </span>

          </div>

          <h2 className="text-4xl font-bold text-blue-600 mt-6">
            ₹ {product.price}
          </h2>

          <p className="text-gray-600 leading-8 mt-8">
            {product.description}
          </p>

          <div className="space-y-4 mt-10">

            <div className="flex items-center gap-3">
              <FaTruck className="text-green-600 text-xl"/>
              Free Delivery Available
            </div>

            <div className="flex items-center gap-3">
              <FaShieldAlt className="text-blue-600 text-xl"/>
              Secure Payment
            </div>

          </div>

          <button
            onClick={addToCart}
            className="mt-10 bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl text-lg font-semibold flex items-center gap-3 transition"
          >
            <FaShoppingCart />
            Add To Cart
          </button>

        </div>

      </div>

    </section>
  );
}

export default ProductDetails;