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

---

## 🛠️ Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React 19, Vite 5, React Router DOM  |
| Backend    | Node.js 18+, Express.js             |
| Database   | MongoDB Atlas, Mongoose             |
| HTTP Client| Axios                               |
| Dev Tools  | Nodemon, Concurrently               |
| Styling    | Vanilla CSS (dark theme)            |

---

## 📁 Project Structure

```
e-commerce-app/
├── package.json          # Root orchestration (concurrently)
├── client/               # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── CartPanel.jsx
│   │   │   └── Toast.jsx
│   │   ├── pages/
│   │   │   ├── ShopPage.jsx
│   │   │   ├── ProductDetailPage.jsx
│   │   │   └── OrdersPage.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js    # Proxy: /api → http://localhost:5000
│   └── .npmrc            # legacy-peer-deps=true
└── server/               # Express + MongoDB backend
    ├── models/
    │   ├── Product.js
    │   └── Order.js
    ├── controllers/
    │   ├── productController.js
    │   └── orderController.js
    ├── routes/
    │   ├── productRoutes.js
    │   └── orderRoutes.js
    ├── server.js
    ├── seed.js            # Populates 10 sample products
    └── .env
```

---

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

### 5. Start the application
```bash
npm start
```

This runs both the backend (port `5000`) and the frontend (port `5173`) concurrently.

| Service  | URL                        |
|----------|----------------------------|
| Frontend | http://localhost:5173       |
| Backend  | http://localhost:5000       |
| API Test | http://localhost:5000/api/test |

---

## 📡 API Endpoints

### Products

| Method | Endpoint                | Description                          |
|--------|-------------------------|--------------------------------------|
| GET    | `/api/products`         | Get all products (supports `?category=` and `?search=`) |
| GET    | `/api/products/:id`     | Get a single product by ID           |
| POST   | `/api/products`         | Create a new product                 |
| PUT    | `/api/products/:id`     | Update a product                     |
| DELETE | `/api/products/:id`     | Delete a product                     |

### Orders

| Method | Endpoint           | Description                          |
|--------|--------------------|--------------------------------------|
| POST   | `/api/orders`      | Place a new order (deducts stock)    |
| GET    | `/api/orders`      | Get all orders                       |
| GET    | `/api/orders/:id`  | Get a specific order by ID           |

---

## 🗃️ Data Models

### Product
```js
{
  name:        String  (required),
  description: String  (required),
  price:       Number  (required, min: 0),
  category:    String  (enum: Electronics | Clothing | Books | Home & Garden | Sports | Beauty | Toys | Other),
  image:       String,
  stock:       Number  (default: 0),
  rating:      Number  (0–5),
  numReviews:  Number,
  timestamps:  true
}
```

### Order
```js
{
  customerName:    String  (required),
  customerEmail:   String  (required),
  items: [{
    product:  ObjectId (ref: Product),
    name:     String,
    price:    Number,
    quantity: Number,
    image:    String
  }],
  totalAmount:     Number,
  status:          String  (Pending | Processing | Shipped | Delivered | Cancelled),
  shippingAddress: { street, city, state, zip },
  timestamps:      true
}
```

---

## 📜 Available Scripts

| Command                  | Description                                      |
|--------------------------|--------------------------------------------------|
| `npm run install-all`    | Install root, server, and client dependencies    |
| `npm start`              | Start both servers concurrently                  |
| `npm run start-server`   | Start only the Express backend                   |
| `npm run start-client`   | Start only the Vite dev server                   |
| `npm run build`          | Build the React client for production            |
| `node server/seed.js`    | Seed the database with sample products           |

---

## 🌐 Deployment Notes

- Set `MONGO_URI` in your cloud VM's environment variables or `.env` file.
- For production, build the client (`npm run build`) and serve the `client/dist` folder via Express or a static host (e.g., Nginx).
- Ensure port `5000` is open in your VM's firewall/security group.

