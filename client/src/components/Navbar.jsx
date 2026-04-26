import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ cartCount, onCartOpen }) {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo">⚡ ShopVerse</Link>
        <div className="navbar-links">
          <Link to="/">Shop</Link>
          <Link to="/orders">My Orders</Link>
          <button
            id="cart-btn"
            className="navbar-cart-btn"
            onClick={onCartOpen}
          >
            🛒 Cart
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
}
