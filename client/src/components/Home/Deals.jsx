import { Link } from "react-router-dom";

function Deals({ products }) {
  const deals = products
    .filter((product) => product.discount > 0)
    .slice(0, 4);

  if (deals.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 py-14">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h2 className="text-4xl font-bold text-slate-800">
            🔥 Today's Deals
          </h2>

          <p className="text-gray-500 mt-2">
            Grab the hottest discounts before they're gone.
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

        {deals.map((product) => (

          <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden"
          >

            <div className="relative">

              <img
                src={product.image}
                alt={product.name}
                className="h-56 w-full object-cover"
              />

              <span className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                {product.discount}% OFF
              </span>

            </div>

            <div className="p-5">

              <h3 className="font-bold text-lg line-clamp-1">
                {product.name}
              </h3>

              <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                {product.description}
              </p>

              <div className="mt-4 flex items-center gap-3">

                <span className="text-2xl font-bold text-blue-600">
                  ₹{product.price}
                </span>

                <span className="line-through text-gray-400">
                  ₹
                  {Math.round(
                    product.price +
                      (product.price * product.discount) / 100
                  )}
                </span>

              </div>

            </div>

          </Link>

        ))}

      </div>

    </section>
  );
}

export default Deals;
