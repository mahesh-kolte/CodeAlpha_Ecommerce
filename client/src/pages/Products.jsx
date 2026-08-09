 import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import { FaBoxOpen, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PRODUCTS_PER_PAGE = 12;

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "All";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/products");
      setProducts(res.data.products || res.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // URL मधल्या category नुसार products filter
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const allCategories = [...new Set(products.map((p) => p.category).filter(Boolean))];

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);
  const startIndex = (safePage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  const updateParams = (updates) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "" || value === "All") {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    });
    setSearchParams(next);
  };

  const handleCategorySelect = (cat) => {
    updateParams({ category: cat === "All" ? null : cat, page: null });
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    updateParams({ page: page === 1 ? null : page });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Page numbers दाखवण्यासाठी (जास्त pages असतील तर ... सोबत compact दाखवतो)
  const getPageNumbers = () => {
    const pages = [];
    const delta = 1;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= safePage - delta && i <= safePage + delta)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }

    return pages;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-8">
        <p className="text-sm font-medium text-indigo-600 tracking-wide uppercase mb-1">
          Shop
        </p>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          {activeCategory === "All" ? "All Products" : activeCategory}
        </h1>
        <p className="text-slate-500 mt-2">
          {!loading &&
            `${filteredProducts.length} product${filteredProducts.length !== 1 ? "s" : ""} available`}
        </p>
      </div>

      {/* Category chips */}
      {!loading && allCategories.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-10">
          <button
            onClick={() => handleCategorySelect("All")}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              activeCategory === "All"
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:border-blue-400"
            }`}
          >
            All
          </button>

          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                activeCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-blue-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse">
              <div className="w-full h-64 bg-gray-200" />
              <div className="p-5 space-y-3">
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-8 bg-gray-200 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-16 text-center">
          <div className="mx-auto w-20 h-20 rounded-2xl bg-indigo-50 flex items-center justify-center mb-5">
            <FaBoxOpen className="text-3xl text-indigo-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">
            {activeCategory === "All"
              ? "No products found"
              : `No products in ${activeCategory} yet`}
          </h2>
          <p className="text-slate-500 mt-2 max-w-sm mx-auto">
            नवीन products लवकरच add होतील. दुसरी category try कर.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => goToPage(safePage - 1)}
                disabled={safePage === 1}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <FaChevronLeft size={14} />
              </button>

              {getPageNumbers().map((page, index) =>
                page === "..." ? (
                  <span key={`dots-${index}`} className="px-2 text-slate-400">
                    …
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg font-semibold text-sm transition ${
                      page === safePage
                        ? "bg-blue-600 text-white"
                        : "border border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() => goToPage(safePage + 1)}
                disabled={safePage === totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <FaChevronRight size={14} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Products;