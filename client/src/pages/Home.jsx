 import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import { useSearch } from "../context/SearchContext";

import Deals from "../components/Home/Deals";
import BestSellers from "../components/Home/BestSellers";
import NewArrivals from "../components/Home/NewArrivals";
import WhyChooseUs from "../components/Home/WhyChooseUs";
import Reviews from "../components/Home/Reviews";
import Newsletter from "../components/Home/Newsletter";

function Home() {
  const [products, setProducts] = useState([]);
  const { search } = useSearch();

  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products");
      setProducts(data.products || []);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts = [...products]
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      return 0;
    });

  return (
    <>
      {/* Hero */}
      <Hero />

      {/* Categories */}
      <CategorySection />

      {/* Home Sections */}
      <Deals products={products} />

      <BestSellers products={products} />

      <NewArrivals products={products} />

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800">
            Featured Products
          </h2>

          <p className="text-gray-500 mt-3 text-lg">
            Explore our latest premium collection
          </p>

          <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="All">All Categories</option>

            {[...new Set(products.map((p) => p.category))].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="">Sort By</option>
            <option value="low">Price : Low to High</option>
            <option value="high">Price : High to Low</option>
          </select>

        </div>

        {/* Products */}

        {filteredProducts.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold">
              No Products Found
            </h2>

            <p className="text-gray-500 mt-2">
              Try another category or search.
            </p>
          </div>
        )}

      </section>

      {/* Bottom Sections */}

      <WhyChooseUs />

      <Reviews />

      <Newsletter />
    </>
  );
}

export default Home;