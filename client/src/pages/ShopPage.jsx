import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Beauty', 'Toys', 'Other'];

function StarRating({ rating }) {
  return (
    <span className="product-rating">
      {'★'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))} {rating.toFixed(1)}
    </span>
  );
}

export default function ShopPage({ addToCart, addToast }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {};
      if (category !== 'All') params.category = category;
      if (search) params.search = search;
      const { data } = await axios.get('/api/products', { params });
      setProducts(data);
    } catch {
      addToast('Failed to load products', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, [category, search]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  const stockLabel = (stock) => {
    if (stock === 0) return <span className="product-stock out">Out of Stock</span>;
    if (stock < 10) return <span className="product-stock low">Only {stock} left</span>;
    return <span className="product-stock">In Stock</span>;
  };

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <h1>Shop the Future,<br />Today.</h1>
          <p>Discover thousands of premium products curated just for you. Fast delivery, easy returns.</p>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <input
              id="hero-search"
              className="search-input"
              style={{ width: 340, borderRadius: 30 }}
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit" className="btn-primary" style={{ padding: '10px 28px' }}>Search</button>
          </form>
        </div>
      </section>

      <div className="container">
        {/* FILTERS */}
        <div className="filters">
          <div className="filter-chips">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                id={`filter-${c.replace(/\s+/g, '-').toLowerCase()}`}
                className={`chip ${category === c ? 'active' : ''}`}
                onClick={() => { setCategory(c); setSearch(''); setSearchInput(''); }}
              >
                {c}
              </button>
            ))}
          </div>
          <form onSubmit={handleSearch}>
            <input
              className="search-input"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </form>
        </div>

        {/* GRID */}
        {loading ? (
          <div className="loading"><div className="spinner" /><p>Loading products...</p></div>
        ) : products.length === 0 ? (
          <div className="empty"><p style={{ fontSize: '3rem' }}>🔍</p><p>No products found. Try a different search.</p></div>
        ) : (
          <div className="products-grid">
            {products.map((p) => (
              <div key={p._id} className="product-card">
                <Link to={`/product/${p._id}`}>
                  <img src={p.image || 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=400&q=80'} alt={p.name} className="product-img" />
                </Link>
                <div className="product-info">
                  <p className="product-category">{p.category}</p>
                  <Link to={`/product/${p._id}`}><h3 className="product-name">{p.name}</h3></Link>
                  <p className="product-desc">{p.description}</p>
                  <div className="product-footer">
                    <p className="product-price">₹{p.price.toLocaleString()} <span>/unit</span></p>
                    <StarRating rating={p.rating} />
                  </div>
                  {stockLabel(p.stock)}
                  <button
                    id={`add-to-cart-${p._id}`}
                    className="btn-add"
                    disabled={p.stock === 0}
                    onClick={() => { addToCart(p); addToast(`${p.name} added to cart!`, 'success'); }}
                  >
                    {p.stock === 0 ? 'Out of Stock' : '+ Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
