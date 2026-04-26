import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ProductDetailPage({ addToCart, addToast }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then(({ data }) => setProduct(data))
      .catch(() => addToast('Product not found', 'error'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="loading"><div className="spinner" /><p>Loading product...</p></div>;
  if (!product) return <div className="empty"><p>Product not found.</p></div>;

  const stockClass = product.stock === 0 ? 'out' : product.stock < 10 ? 'low' : '';

  return (
    <div className="container detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back to Shop</button>
      <div className="detail-layout">
        <img
          src={product.image || 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=800&q=80'}
          alt={product.name}
          className="detail-img"
        />
        <div className="detail-info">
          <p className="product-category">{product.category}</p>
          <h1>{product.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <span className="product-rating">
              {'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))} {product.rating.toFixed(1)}
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '.85rem' }}>({product.numReviews} reviews)</span>
          </div>
          <p className="detail-price">₹{product.price.toLocaleString()}</p>
          <p className="detail-desc">{product.description}</p>
          <p className={`product-stock ${stockClass}`} style={{ marginBottom: 20 }}>
            {product.stock === 0 ? 'Out of Stock' : `${product.stock} units available`}
          </p>

          {product.stock > 0 && (
            <>
              <div className="qty-row">
                <span style={{ color: 'var(--text-muted)', fontSize: '.9rem' }}>Quantity:</span>
                <button id="qty-dec" className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                <span className="qty-value">{qty}</span>
                <button id="qty-inc" className="qty-btn" onClick={() => setQty(Math.min(product.stock, qty + 1))}>+</button>
              </div>
              <button
                id="detail-add-to-cart"
                className="btn-primary"
                onClick={() => {
                  for (let i = 0; i < qty; i++) addToCart(product);
                  addToast(`${qty} × ${product.name} added to cart!`, 'success');
                  navigate('/');
                }}
              >
                🛒 Add {qty} to Cart — ₹{(product.price * qty).toLocaleString()}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
