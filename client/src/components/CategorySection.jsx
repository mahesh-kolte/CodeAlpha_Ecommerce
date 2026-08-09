 import { useNavigate } from "react-router-dom";
import {
  FaLaptop,
  FaMobileAlt,
  FaTshirt,
  FaRunning,
  FaClock,
  FaHeadphones,
} from "react-icons/fa";

const categories = [
  {
    icon: <FaLaptop size={35} />,
    name: "Laptops",
  },
  {
    icon: <FaMobileAlt size={35} />,
    name: "Mobiles",
  },
  {
    icon: <FaTshirt size={35} />,
    name: "Fashion",
  },
  {
    icon: <FaRunning size={35} />,
    name: "Shoes",
  },
  {
    icon: <FaClock size={35} />,
    name: "Watches",
  },
  {
    icon: <FaHeadphones size={35} />,
    name: "Accessories",
  },
];

function CategorySection() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    navigate(`/products?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-slate-800">
          Shop By Category
        </h2>

        <p className="text-gray-500 mt-3">
          Choose your favourite category
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(category.name)}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 p-8 text-center cursor-pointer"
          >
            <div className="text-blue-600 flex justify-center mb-4">
              {category.icon}
            </div>

            <h3 className="font-semibold text-slate-700">
              {category.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;