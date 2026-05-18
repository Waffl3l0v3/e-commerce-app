# ⚡ ShopVerse — MERN E-Commerce Application

A full-stack e-commerce application built with the **MERN stack** (MongoDB, Express.js, React, Node.js). Users can browse products by category, search, view product details, manage a shopping cart, and simulate a complete purchase flow.

---

## 🚀 Features

- 🛍️ **Product Browsing** — Browse products with category filters and live search
- 📄 **Product Detail Pages** — View full product info, ratings, stock status, and quantity selector
- 🛒 **Shopping Cart** — Slide-over cart panel with quantity management and real-time totals
- ✅ **Checkout Simulation** — Place orders with shipping details; stock is deducted on the server
- 📦 **Orders Page** — View all previously placed orders with status badges
- 🔔 **Toast Notifications** — Real-time feedback for cart actions and errors
- 📱 **Responsive Design** — Works across desktop and mobile screens



## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18.0.0 or higher
- A MongoDB Atlas URI (or local MongoDB instance)

### 1. Clone the repository
```bash
git clone https://github.com/Waffl3l0v3/e-commerce-app.git
cd e-commerce-app
```

### 2. Configure environment variables
Create/edit `server/.env`:
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/e-commerce-app?retryWrites=true&w=majority
PORT=5000
```

### 3. Install all dependencies
```bash
npm run install-all
```

### 4. Seed the database (first-time setup)
```bash
node server/seed.js
```
This inserts **10 sample products** across Electronics, Clothing, Books, Sports, Beauty, Home & Garden, and Toys.
