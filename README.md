# 🛒 CodeAlpha E-Commerce Store

A modern Full Stack E-Commerce Web Application built using the MERN Stack (MongoDB, Express.js, React.js, Node.js). This project was developed as part of the CodeAlpha Full Stack Development Internship.

---

## 🚀 Features

### 👤 User Features
- User Registration & Login (JWT Authentication)
- Browse Products
- Product Details Page
- Search Products
- Category Filter
- Price Sorting
- Add to Cart
- Wishlist
- Secure Checkout
- Cash on Delivery (COD)
- Razorpay Online Payment
- Order History
- Responsive Design

### 🛠️ Admin Features
- Admin Dashboard
- Add Products
- Edit Products
- Delete Products
- Manage Orders
- Manage Users

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Axios
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Bcrypt.js
- Multer
- Cloudinary
- Razorpay

---

## 📂 Project Structure

```
CodeAlpha_Ecommerce
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── config
│   └── server.js
│
├── frontend
│   ├── src
│   ├── components
│   ├── pages
│   ├── context
│   ├── services
│   └── App.jsx
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/CodeAlpha_Ecommerce.git
```

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET_KEY

CLOUDINARY_CLOUD_NAME=YOUR_CLOUD_NAME
CLOUDINARY_API_KEY=YOUR_API_KEY
CLOUDINARY_API_SECRET=YOUR_API_SECRET

RAZORPAY_KEY_ID=YOUR_KEY
RAZORPAY_SECRET=YOUR_SECRET
```

Frontend `.env`

```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=YOUR_KEY
```

---

## 📸 Screenshots

Add screenshots here.

- Home Page
- Product Details
- Cart
- Checkout
- Razorpay Payment
- Orders
- Admin Dashboard

---

## 🎯 Internship Task

This project was created for the **CodeAlpha Full Stack Development Internship**.

Implemented Features:

- Product Listing
- Product Details
- Shopping Cart
- User Registration/Login
- Order Processing
- MongoDB Database
- REST API
- Admin Panel
- Razorpay Payment Integration

---

## 👨‍💻 Author

**Mahesh Kolte**

GitHub: https://github.com/YOUR_USERNAME

LinkedIn: YOUR_LINKEDIN_PROFILE

---

## ⭐ Support

If you like this project, please give it a ⭐ on GitHub.
