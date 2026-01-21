import { X } from "lucide-react";
import { createPortal } from "react-dom";
import styles from "./TicketModal.module.css";

const TicketModal = ({ onClose, children }) => {
  if (!children) return null;
  if (typeof document === "undefined") return null;

  const handleClose = () => {
    if (onClose) onClose();
  };

  return createPortal(
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={handleClose}>
          <X size={18} />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default TicketModal;
