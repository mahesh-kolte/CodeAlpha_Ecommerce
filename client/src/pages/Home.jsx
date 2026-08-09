 import { useEffect, useState } from "react";
import API from "../services/api";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import FadeInSection from "../components/FadeInSection";
import StatsCounter from "../components/StatsCounter";
import CategoryRow from "../components/CategoryRow";

import Deals from "../components/Home/Deals";
import BestSellers from "../components/Home/BestSellers";
import NewArrivals from "../components/Home/NewArrivals";
import WhyChooseUs from "../components/Home/WhyChooseUs";
import Reviews from "../components/Home/Reviews";
import Newsletter from "../components/Home/Newsletter";

const HOME_CATEGORIES = ["Mobiles", "Laptops", "Fashion", "Shoes", "Watches", "Accessories"];

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/products");
      setProducts(data.products || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <Hero />

      {/* Categories */}
      <FadeInSection>
        <CategorySection />
      </FadeInSection>

      {/* Stats */}
      <StatsCounter />

      {loading ? (
        // Products येईपर्यंत हलका skeleton — रिकामी जागा दिसण्याऐवजी
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
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
        </div>
      ) : (
        <>
          {/* Home Sections (curated) */}
          <FadeInSection delay={100}>
            <Deals products={products} />
          </FadeInSection>

          <FadeInSection delay={100}>
            <BestSellers products={products} />
          </FadeInSection>

          <FadeInSection delay={100}>
            <NewArrivals products={products} />
          </FadeInSection>

          {/* Category-wise rows */}
          {HOME_CATEGORIES.map((cat) => (
            <FadeInSection key={cat}>
              <CategoryRow category={cat} products={products} />
            </FadeInSection>
          ))}
        </>
      )}

      {/* Bottom Sections */}
      <FadeInSection>
        <WhyChooseUs />
      </FadeInSection>

      <FadeInSection>
        <Reviews />
      </FadeInSection>

      <FadeInSection>
        <Newsletter />
      </FadeInSection>
    </>
  );
}

export default Home;