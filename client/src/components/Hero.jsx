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

// CategorySection मधल्या cards शीच जुळणारी नावं — नवीन category add केली तर
// इथे पण जोडली की तिचा row आपोआप दिसेल.
const HOME_CATEGORIES = ["Mobiles", "Laptops", "Fashion", "Shoes", "Watches", "Accessories"];

function Home() {
  const [products, setProducts] = useState([]);

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

      {/* Category-wise rows — प्रत्येक category चे थोडेच (8) products, "View All" सोबत */}
      {HOME_CATEGORIES.map((cat) => (
        <FadeInSection key={cat}>
          <CategoryRow category={cat} products={products} />
        </FadeInSection>
      ))}

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