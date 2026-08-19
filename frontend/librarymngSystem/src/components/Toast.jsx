import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext(null);

let toastId = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info", duration = 4000) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (message, opts) => {
      const type =
        typeof opts === "string" ? opts : opts?.type || "info";
      const duration =
        typeof opts === "object" ? opts.duration : undefined;
      return addToast(message, type, duration);
    },
    [addToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, toast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}

function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="bf-toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`bf-toast bf-toast-${t.type}`}>
          <div className="bf-toast-icon">
            {t.type === "success" && "✓"}
            {t.type === "error" && "✕"}
            {t.type === "warning" && "⚠"}
            {t.type === "info" && "ℹ"}
          </div>
          <span className="bf-toast-message">{t.message}</span>
          <button
            className="bf-toast-close"
            onClick={() => removeToast(t.id)}
            aria-label="Close"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
