 import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaShippingFast,
  FaLock,
  FaUndoAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const slides = [
  {
    badge: "🔥 New Collection 2026",
    heading: (
      <>
        Discover Your
        <br />
        <span className="text-blue-400">Perfect Shopping</span>
        <br />
        Experience
      </>
    ),
    description:
      "Shop premium quality products with secure payment, fast delivery and unbeatable prices.",
    ctaText: "Shop Now",
    ctaLink: "/products",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&auto=format&fit=crop",
  },
  {
    badge: "📱 Latest Mobiles",
    heading: (
      <>
        Upgrade To The
        <br />
        <span className="text-blue-400">Newest Smartphones</span>
        <br />
        Today
      </>
    ),
    description:
      "Flagship phones, best cameras, longest battery life — all at prices that make sense.",
    ctaText: "Explore Mobiles",
    ctaLink: "/products?category=Mobiles",
    image:
      "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=900&auto=format&fit=crop",
  },
  {
    badge: "⚡ Up To 30% Off",
    heading: (
      <>
        Big Savings On
        <br />
        <span className="text-blue-400">Laptops & Accessories</span>
        <br />
        This Week
      </>
    ),
    description:
      "Limited-time deals on top brands. Grab your favourites before the offer ends.",
    ctaText: "View Deals",
    ctaLink: "/products?category=Laptops",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900&auto=format&fit=crop",
  },
];

const AUTO_SLIDE_INTERVAL = 5000;

function Hero() {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((index) => {
    setCurrent((index + slides.length) % slides.length);
  }, []);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 flex flex-col-reverse lg:flex-row items-center justify-between gap-14 min-h-[560px]">
        {/* Left Side */}
        <div className="max-w-xl transition-all duration-500 ease-out">
          <span
            key={`badge-${current}`}
            className="inline-block bg-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-5 animate-[fadeIn_0.5s_ease-out]"
          >
            {slide.badge}
          </span>

          <h1
            key={`heading-${current}`}
            className="text-5xl lg:text-6xl font-extrabold leading-tight animate-[fadeIn_0.6s_ease-out]"
          >
            {slide.heading}
          </h1>

          <p
            key={`desc-${current}`}
            className="text-gray-300 mt-6 text-lg leading-8 animate-[fadeIn_0.7s_ease-out]"
          >
            {slide.description}
          </p>

          <div className="flex gap-4 mt-8 flex-wrap">
            <Link
              to={slide.ctaLink}
              className="bg-blue-600 hover:bg-blue-700 px-7 py-3 rounded-xl font-semibold flex items-center gap-2 transition duration-300"
            >
              {slide.ctaText}
              <FaArrowRight />
            </Link>

            <Link
              to="/orders"
              className="border border-white hover:bg-white hover:text-slate-900 px-7 py-3 rounded-xl font-semibold transition duration-300"
            >
              My Orders
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-12">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center">
              <FaShippingFast className="mx-auto text-3xl text-blue-400 mb-3" />
              <p className="font-semibold">Free Delivery</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center">
              <FaLock className="mx-auto text-3xl text-green-400 mb-3" />
              <p className="font-semibold">Secure Payment</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center">
              <FaUndoAlt className="mx-auto text-3xl text-yellow-400 mb-3" />
              <p className="font-semibold">Easy Returns</p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative">
          <div className="absolute -inset-5 bg-blue-500 blur-3xl opacity-20 rounded-full"></div>

          <img
            key={`img-${current}`}
            src={slide.image}
            alt="Premium Product"
            className="relative w-full max-w-xl rounded-[2rem] shadow-2xl shadow-slate-950/40 object-cover aspect-square transition-opacity duration-500 animate-[fadeIn_0.6s_ease-out]"
          />
        </div>
      </div>

      {/* Arrow Navigation */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="hidden md:flex items-center justify-center absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition"
      >
        <FaChevronLeft />
      </button>

      <button
        onClick={next}
        aria-label="Next slide"
        className="hidden md:flex items-center justify-center absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition"
      >
        <FaChevronRight />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === current ? "w-8 bg-blue-400" : "w-2 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

export default Hero;