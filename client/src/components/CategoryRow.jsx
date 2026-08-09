import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import ProductCard from "./ProductCard";

const ITEMS_PER_ROW = 8;

function CategoryRow({ category, products }) {
  const categoryProducts = products
    .filter((p) => p.category === category)
    .slice(0, ITEMS_PER_ROW);

  if (categoryProducts.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
          {category}
        </h2>

        <Link
          to={`/products?category=${encodeURIComponent(category)}`}
          className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-semibold text-sm transition"
        >
          View All
          <FaArrowRight size={12} />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {categoryProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default CategoryRow;