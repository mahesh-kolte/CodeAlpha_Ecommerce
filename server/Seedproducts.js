 // seedProducts.js
// DummyJSON (https://dummyjson.com) वरून खरी product data (नाव, description, price,
// rating, discount, image) आणून आपल्या 6 categories मध्ये टाकतो — त्यामुळे catalog
// एकदम professional आणि real दिसतो, random-generated नावांऐवजी.
//
// आवश्यक: Node.js v18+ (built-in fetch लागतो) आणि internet connection.
//
// कसं वापरायचं:
// 1. ही file backend folder मध्ये टाक (जिथे server.js आहे तिथेच, root मध्ये)
// 2. खालचा "./models/Product" path बरोबर आहे याची खात्री कर
// 3. .env मध्ये MONGO_URI सेट असल्याची खात्री कर
// 4. Terminal मध्ये backend folder मध्ये जाऊन चालव:
//      node seedProducts.js

const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product"); // path तुझ्या project प्रमाणे बदल जर वेगळा असेल

// आपल्या 6 categories → DummyJSON च्या actual categories
const categorySourceMap = {
  Laptops: ["laptops"],
  Mobiles: ["smartphones"],
  Fashion: ["tops", "womens-dresses", "mens-shirts"],
  Shoes: ["mens-shoes", "womens-shoes"],
  Watches: ["mens-watches", "womens-watches"],
  Accessories: ["sunglasses", "womens-bags", "womens-jewellery"],
};

// USD (DummyJSON) → आपला INR सारखा दिसणारा price बनवण्यासाठी multiplier
const PRICE_MULTIPLIER = 80;

const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// एका DummyJSON category मधून पूर्ण product data आणतो
const fetchProductsForCategory = async (dummyCategories) => {
  let items = [];

  for (const cat of dummyCategories) {
    try {
      const res = await fetch(`https://dummyjson.com/products/category/${cat}?limit=50`);
      const data = await res.json();

      if (data.products && data.products.length > 0) {
        items = items.concat(data.products);
      }
    } catch (err) {
      console.log(`Warning: could not fetch "${cat}" —`, err.message);
    }
  }

  return items;
};

const buildProduct = (item, category) => {
  const price = Math.round(item.price * PRICE_MULTIPLIER);
  const image = item.thumbnail || (item.images && item.images[0]) || "";

  return {
    name: item.title,
    brand: item.brand || item.category || category,
    category,
    price,
    stock: item.stock ?? Math.floor(Math.random() * 80) + 10,
    rating: item.rating ? Number(item.rating.toFixed(1)) : 4.5,
    discount: item.discountPercentage ? Math.round(item.discountPercentage) : 0,
    description: item.description || `${item.title} — quality ${category} product.`,
    image,
    featured: Math.random() < 0.2,
    bestSeller: Math.random() < 0.2,
    newArrival: Math.random() < 0.3,
    todaysDeal: Math.random() < 0.15,
  };
};

const generateProducts = async () => {
  const products = [];

  for (const [category, dummyCategories] of Object.entries(categorySourceMap)) {
    console.log(`Fetching real products for ${category}...`);
    const items = await fetchProductsForCategory(dummyCategories);

    if (items.length === 0) {
      console.log(`No products found for ${category}, skipping.`);
      continue;
    }

    // प्रत्येक category मधून 20 products निवडतो (कमी असतील तर repeat करून भरतो)
    const picked = [];
    while (picked.length < 20) {
      picked.push(randomFrom(items));
    }

    picked.forEach((item) => {
      products.push(buildProduct(item, category));
    });
  }

  return products;
};

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    await Product.deleteMany({});
    console.log("Old products cleared");

    const dummyProducts = await generateProducts();
    await Product.insertMany(dummyProducts);

    console.log(`${dummyProducts.length} dummy products added successfully`);
    console.log("Categories: Laptops, Mobiles, Fashion, Shoes, Watches, Accessories — 20 each");

    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

seed();