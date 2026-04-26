import { useEffect } from 'react';

export default function Toast({ toasts, removeToast }) {
  useEffect(() => {
    if (toasts.length === 0) return;
    const timer = setTimeout(() => removeToast(toasts[0].id), 3000);
    return () => clearTimeout(timer);
  }, [toasts]);

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`}>
          {t.type === 'success' ? '✅' : '❌'} {t.message}
        </div>
      ))}
    </div>
  );
}
