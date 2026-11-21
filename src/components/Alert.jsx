import { useEffect } from "react";
import { useSelector } from "react-redux";

function Alert({ message, type = "info", onClose }) {
  useEffect(() => {
    // Auto-dismiss info/success alerts after 4 seconds
    if (type === "info" || type === "success") {
      const timer = setTimeout(() => {
        onClose?.();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, type, onClose]);

  const styleMap = {
    success: "alert alert-success",
    error: "alert alert-error",
    info: "alert alert-info",
  };

  if (!message) return null;

  return (
    <div className={styleMap[type] || styleMap.info} role="alert">
      {message}
      {onClose && (
        <button
          type="button"
          className="btn btn-outline"
          onClick={onClose}
          style={{ marginLeft: 10 }}
        >
          Dismiss
        </button>
      )}
    </div>
  );
}

export default Alert;