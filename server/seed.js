require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  {
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Premium over-ear headphones with 30-hour battery life and active noise cancellation.',
    price: 2999,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
    stock: 25,
    rating: 4.7,
    numReviews: 128,
  },
  {
    name: 'Smart Fitness Watch',
    description: 'Track your health metrics, GPS, heart rate, sleep — waterproof up to 50m.',
    price: 4499,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
    stock: 40,
    rating: 4.5,
    numReviews: 89,
  },
  {
    name: 'Men\'s Classic Oxford Shirt',
    description: 'Premium 100% cotton Oxford weave shirt, perfect for formal and casual occasions.',
    price: 799,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1602810316693-3667c854239a?w=400&q=80',
    stock: 60,
    rating: 4.3,
    numReviews: 45,
  },
  {
    name: 'The Art of War',
    description: 'Sun Tzu\'s timeless classic on strategy, leadership and competitive advantage.',
    price: 199,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80',
    stock: 100,
    rating: 4.8,
    numReviews: 320,
  },
  {
    name: 'Aromatherapy Diffuser Set',
    description: 'Ultrasonic essential oil diffuser with 7 LED colors and 10 premium oils included.',
    price: 1299,
    category: 'Home & Garden',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&q=80',
    stock: 30,
    rating: 4.6,
    numReviews: 67,
  },
  {
    name: 'Yoga Mat Pro',
    description: 'Non-slip extra-thick 6mm yoga mat with carrying strap and alignment lines.',
    price: 899,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1601925228654-e9e8c7e92f79?w=400&q=80',
    stock: 50,
    rating: 4.4,
    numReviews: 112,
  },
  {
    name: 'Vitamin C Serum',
    description: '20% vitamin C with hyaluronic acid and vitamin E for brighter, younger-looking skin.',
    price: 599,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80',
    stock: 80,
    rating: 4.5,
    numReviews: 203,
  },
  {
    name: 'LEGO Architecture Set',
    description: 'Build iconic skylines! 560-piece set with detailed architectural models.',
    price: 2499,
    category: 'Toys',
    image: 'https://images.unsplash.com/photo-1587654780291-39c9098b28f4?w=400&q=80',
    stock: 20,
    rating: 4.9,
    numReviews: 55,
  },
  {
    name: 'Bluetooth Mechanical Keyboard',
    description: 'Compact TKL layout with Cherry MX switches, RGB backlight, and multi-device pairing.',
    price: 3499,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&q=80',
    stock: 15,
    rating: 4.6,
    numReviews: 74,
  },
  {
    name: 'Women\'s Running Jacket',
    description: 'Lightweight, wind-resistant and breathable jacket for all-weather training.',
    price: 1599,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&q=80',
    stock: 35,
    rating: 4.2,
    numReviews: 38,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB...');
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log(`✅ Seeded ${products.length} products successfully!`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
};

seedDB();
