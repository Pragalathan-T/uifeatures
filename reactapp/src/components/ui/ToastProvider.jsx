import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const ToastContext = createContext({ addToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = Math.random().toString(36).slice(2);
    const ttlMs = toast.ttlMs ?? 3000;
    setToasts((prev) => [...prev, { id, type: toast.type || 'info', message: toast.message || '' }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, ttlMs);
  }, []);

  const value = useMemo(() => ({ addToast }), [addToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div aria-live="polite" aria-atomic="true" className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((t) => (
          <div key={t.id} className={`rounded-lg shadow-lg ring-1 ring-gray-200 px-4 py-3 text-sm ${
            t.type === 'error' ? 'bg-red-50 text-red-800' : t.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-white text-gray-900'
          }`}>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}