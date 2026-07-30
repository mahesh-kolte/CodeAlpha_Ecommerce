import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

function BestSellers({ products }) {
  const bestSellers = products
    .filter((product) => product.bestSeller)
    .slice(0, 4);

  if (bestSellers.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 py-14">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h2 className="text-4xl font-bold text-slate-800">
            ⭐ Best Sellers
          </h2>

          <p className="text-gray-500 mt-2">
            Most loved products by our customers.
          </p>
        </div>

        <Link
          to="/products"
          className="text-blue-600 font-semibold hover:underline"
        >
          View All →
        </Link>

      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {bestSellers.map((product) => (

          <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden group"
          >

            <div className="relative overflow-hidden">

              <img
                src={product.image}
                alt={product.name}
                className="h-60 w-full object-cover group-hover:scale-110 transition duration-500"
              />

              <span className="absolute top-3 left-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                BEST SELLER
              </span>

            </div>

            <div className="p-5">

              <h3 className="font-bold text-lg line-clamp-1">
                {product.name}
              </h3>

              <div className="flex items-center gap-1 mt-2">

                <FaStar className="text-yellow-500" />

                <span className="font-semibold">
                  {product.rating || 5}
                </span>

              </div>

              <div className="mt-4 flex justify-between items-center">

                <span className="text-2xl font-bold text-blue-600">
                  ₹{product.price}
                </span>

                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Buy Now
                </button>

              </div>

            </div>

          </Link>

        ))}

      </div>

    </section>
  );
}

export default BestSellers;