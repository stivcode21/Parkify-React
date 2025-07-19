import { MapPin, PhoneCall } from "lucide-react";
import styles from "./LayoutLogin.module.css";
import LogoParkify from "@/components/atoms/logoParkify/LogoParkify";

const LayoutLogin = ({ children }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftPanel}>{children}</div>

        <div className={styles.rightPanel}>
          <h2 className={styles.welcomeText}>Bienvenidos a</h2>
          <LogoParkify />
          <p className={styles.subtitle}>Sistema de gestion parqueadero</p>

          <div className={styles.info}>
            <div className={styles.infoRow}>
              <span className={styles.icon}>
                <MapPin />
              </span>
              <p>Medellin, colombia</p>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.icon}>
                <PhoneCall />
              </span>
              <p>+57 3122222222</p>
            </div>
          </div>

          <img
            src="./src/assets/parking-info.svg"
            className={styles.parking}
            alt="parking icon"
          />
          <footer className={styles.footer}>
            © 2025 desarrollado por stivcode
          </footer>
        </div>
      </div>
    </>
  );
};

export default LayoutLogin;
