import { useState } from 'react';
import axios from 'axios';

export default function CartPanel({ cart, onClose, isOpen, onUpdate, onRemove, addToast }) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [form, setForm] = useState({
    customerName: '', customerEmail: '',
    street: '', city: '', state: '', zip: '',
  });

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setPlacing(true);
    try {
      await axios.post('/api/orders', {
        customerName: form.customerName,
        customerEmail: form.customerEmail,
        items: cart.map((i) => ({ product: i._id, quantity: i.quantity })),
        shippingAddress: { street: form.street, city: form.city, state: form.state, zip: form.zip },
      });
      setOrderSuccess(true);
      cart.forEach((i) => onRemove(i._id));
      addToast('Order placed successfully! 🎉', 'success');
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to place order', 'error');
    } finally {
      setPlacing(false);
    }
  };

  const handleClose = () => {
    setShowCheckout(false);
    setOrderSuccess(false);
    setForm({ customerName: '', customerEmail: '', street: '', city: '', state: '', zip: '' });
    onClose();
  };

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={handleClose} />
      <aside className={`cart-panel ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>🛒 Your Cart ({cart.reduce((s, i) => s + i.quantity, 0)} items)</h2>
          <button className="close-btn" onClick={handleClose} id="close-cart-btn">✕</button>
        </div>

        {!showCheckout ? (
          <>
            <div className="cart-items">
              {cart.length === 0 ? (
                <div className="cart-empty">
                  <p style={{ fontSize: '3rem' }}>🛒</p>
                  <p>Your cart is empty</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item._id} className="cart-item">
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                    <div className="cart-item-info">
                      <p className="cart-item-name">{item.name}</p>
                      <p className="cart-item-price">₹{item.price} × {item.quantity} = ₹{(item.price * item.quantity).toLocaleString()}</p>
                      <div className="cart-item-qty">
                        <button onClick={() => onUpdate(item._id, item.quantity - 1)}>−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => onUpdate(item._id, item.quantity + 1)}>+</button>
                        <button className="cart-remove" onClick={() => onRemove(item._id)}>Remove</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="cart-footer">
              <div className="cart-total">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              <button
                id="checkout-btn"
                className="btn-checkout"
                disabled={cart.length === 0}
                onClick={() => setShowCheckout(true)}
              >
                Proceed to Checkout →
              </button>
            </div>
          </>
        ) : orderSuccess ? (
          <div className="cart-items">
            <div className="success-box">
              <div className="success-icon">🎉</div>
              <h2>Order Placed!</h2>
              <p>Thank you! Your order is confirmed and being processed.</p>
              <button className="btn-primary" onClick={handleClose}>Continue Shopping</button>
            </div>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
            <div className="cart-items">
              <h3 style={{ fontWeight: 700, marginBottom: 16 }}>Shipping Details</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: 'Full Name', name: 'customerName', placeholder: 'Jane Doe' },
                  { label: 'Email', name: 'customerEmail', placeholder: 'jane@example.com', type: 'email' },
                  { label: 'Street Address', name: 'street', placeholder: '123 Main St' },
                  { label: 'City', name: 'city', placeholder: 'Mumbai' },
                  { label: 'State', name: 'state', placeholder: 'Maharashtra' },
                  { label: 'ZIP Code', name: 'zip', placeholder: '400001' },
                ].map((f) => (
                  <div key={f.name} className="form-group">
                    <label>{f.label}</label>
                    <input
                      type={f.type || 'text'}
                      name={f.name}
                      value={form[f.name]}
                      onChange={handleChange}
                      placeholder={f.placeholder}
                      required
                    />
                  </div>
                ))}
              </div>
              <div className="modal-order-summary">
                <p style={{ fontWeight: 700, marginBottom: 10 }}>Order Summary</p>
                {cart.map((i) => (
                  <div key={i._id} className="modal-order-row">
                    <span>{i.name} × {i.quantity}</span>
                    <span>₹{(i.price * i.quantity).toLocaleString()}</span>
                  </div>
                ))}
                <div className="modal-order-total">
                  <span>Total</span><span>₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="cart-footer">
              <div className="modal-actions" style={{ marginTop: 0 }}>
                <button type="button" className="btn-cancel" onClick={() => setShowCheckout(false)}>← Back</button>
                <button type="submit" id="place-order-btn" className="btn-checkout" disabled={placing} style={{ flex: 2 }}>
                  {placing ? 'Placing Order...' : '✅ Place Order'}
                </button>
              </div>
            </div>
          </form>
        )}
      </aside>
    </>
  );
}
