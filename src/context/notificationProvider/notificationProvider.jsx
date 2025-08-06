import { useState, createContext, useContext } from "react";
import styles from "./notificationProvider.module.css";
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from "lucide-react";

//creo contexto
const NotificationContext = createContext(null);

const icons = {
  Success: <CheckCircle color="#0abf30" size={26} />,
  Error: <AlertCircle color="#f24d4c" size={26} />,
  Warning: <AlertTriangle color="#e9bd0c" size={26} />,
  Info: <Info color="#3498db" size={26} />,
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const createNotification = (type, text) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newNotification = { id, type, text };
    setNotifications((prev) => [...prev, newNotification]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((object) => object.id !== id));
    }, 7000);
  };

  return (
    <NotificationContext.Provider value={createNotification}>
      {children}
      <div className={styles.notifications}>
        {notifications.map(({ id, type, text }) => (
          <div key={id} className={`${styles.toast} ${styles[type]}`}>
            <div className={styles.icon}>{icons[type]}</div>
            <div className={styles.content}>
              <div className={styles.title}>{type}</div>
              <span className={styles.span}>{text}</span>
            </div>
            <div
              className={styles.close}
              onClick={() =>
                setNotifications((prev) => prev.filter((n) => n.id !== id))
              }
            >
              <X size={20} />
            </div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};
