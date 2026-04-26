import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CartPanel from './components/CartPanel';
import Toast from './components/Toast';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import OrdersPage from './pages/OrdersPage';

let toastId = 0;

export default function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToCart = useCallback((product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i._id === product._id);
      if (existing) return prev.map((i) => i._id === product._id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const updateCartQty = useCallback((id, qty) => {
    if (qty < 1) return;
    setCart((prev) => prev.map((i) => i._id === id ? { ...i, quantity: qty } : i));
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((i) => i._id !== id));
  }, []);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <BrowserRouter>
      <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
      <CartPanel
        cart={cart}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onUpdate={updateCartQty}
        onRemove={removeFromCart}
        addToast={addToast}
      />
      <Toast toasts={toasts} removeToast={removeToast} />
      <main>
        <Routes>
          <Route path="/" element={<ShopPage addToCart={addToCart} addToast={addToast} />} />
          <Route path="/product/:id" element={<ProductDetailPage addToCart={addToCart} addToast={addToast} />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
