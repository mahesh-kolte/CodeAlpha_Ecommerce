import { useEffect, useRef, useState } from "react";
import { FaUsers, FaBoxOpen, FaStar, FaTruck } from "react-icons/fa";

const stats = [
  { icon: <FaUsers />, value: 10000, suffix: "+", label: "Happy Customers", color: "text-blue-400" },
  { icon: <FaBoxOpen />, value: 500, suffix: "+", label: "Products Available", color: "text-green-400" },
  { icon: <FaStar />, value: 4.8, suffix: "★", label: "Average Rating", color: "text-yellow-400", decimals: 1 },
  { icon: <FaTruck />, value: 25000, suffix: "+", label: "Orders Delivered", color: "text-purple-400" },
];

function useCountUp(target, shouldStart, decimals = 0, duration = 1500) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // ease-out curve, जेणेकरून शेवटी हळू होईल
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setValue(target);
      }
    };

    requestAnimationFrame(step);
  }, [shouldStart, target, duration]);

  return decimals > 0 ? value.toFixed(decimals) : Math.floor(value).toLocaleString("en-IN");
}

function StatItem({ stat, shouldStart }) {
  const displayValue = useCountUp(stat.value, shouldStart, stat.decimals || 0);

  return (
    <div className="text-center">
      <div className={`text-4xl mb-3 flex justify-center ${stat.color}`}>
        {stat.icon}
      </div>
      <p className="text-4xl font-extrabold text-white">
        {displayValue}
        {stat.suffix}
      </p>
      <p className="text-gray-400 mt-2 text-sm md:text-base">{stat.label}</p>
    </div>
  );
}

function StatsCounter() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 py-16"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatItem key={index} stat={stat} shouldStart={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsCounter;