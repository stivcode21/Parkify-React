import { MapPin, PhoneCall } from "lucide-react";
import styles from "./LayoutLogin.module.css";
import MainParkifyLogo from "@/components/atoms/mainParkifyLogo/MainParkifyLogo";

const LayoutLogin = ({ children }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftPanel}>{children}</div>

        <div className={styles.rightPanel}>
          <h2 className={styles.welcomeText}>Bienvenidos a</h2>
          <MainParkifyLogo />
          <p className={styles.subtitle}>Sistema de gestion parqueadero</p>
          {/* demo toast */}
          <div className={styles.demoToast}>
            <div className={styles.demoHeader}>
              <span className={styles.demoTitle}>Acceso de prueba</span>
            </div>
            <p className={styles.demoText}>
              Usa estas credenciales para explorar la app.
            </p>
            <div className={styles.demoCredentials}>
              <div className={styles.credentialRow}>
                <span className={styles.credentialLabel}>Correo</span>
                <span className={styles.credentialValue}>
                  superadmin@gmail.com
                </span>
              </div>
              <div className={styles.credentialRow}>
                <span className={styles.credentialLabel}>Contraseña</span>
                <span className={styles.credentialValue}>Stivcode12.</span>
              </div>
            </div>
          </div>

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
            src="/parking-info.svg"
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
