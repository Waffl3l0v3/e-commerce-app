import { useState, useEffect } from 'react';
import axios from 'axios';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/orders')
      .then(({ data }) => setOrders(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading"><div className="spinner" /><p>Loading orders...</p></div>;

  return (
    <div className="container orders-page">
      <h1>📦 My Orders</h1>
      {orders.length === 0 ? (
        <div className="empty">
          <p style={{ fontSize: '3rem' }}>📭</p>
          <p>No orders yet. Start shopping!</p>
        </div>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-card-header">
              <div>
                <p style={{ fontWeight: 700 }}>{order.customerName}</p>
                <p className="order-id">#{order._id}</p>
              </div>
              <span className={`order-status status-${order.status}`}>{order.status}</span>
            </div>

            <div className="order-items-list">
              {order.items.map((item, i) => (
                <span key={i} className="order-item-tag">
                  {item.name} × {item.quantity}
                </span>
              ))}
            </div>

            <div className="order-footer">
              <span className="order-total">₹{order.totalAmount.toLocaleString()}</span>
              <div style={{ textAlign: 'right' }}>
                <p className="order-date">{new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                <p style={{ fontSize: '.8rem', color: 'var(--text-muted)' }}>
                  {order.shippingAddress.city}, {order.shippingAddress.state}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
