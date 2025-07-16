import LogoParkify from "@/components/atoms/logoParkify/LogoParkify";
import styles from "./Dashboard.module.css";
import Reloj from "@/components/molecules/reloj/Reloj";
import ActuallyDate from "@/components/molecules/actuallyDate/ActuallyDate";
import ModalOverlay from "@/components/templates/modalOverlay/ModalOverlay";
import Box from "@/components/molecules/box/Box";

const Dashboard = () => {
  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        <header className={styles.header}>
          <ActuallyDate />
          <Reloj />
        </header>

        <LogoParkify />
        <img
          src="./src/assets/auto.svg"
          alt="auto-icon"
          className={styles.auto}
        />

        <Box />
        <ModalOverlay />

        <footer className={styles.footer}>
          © 2025 desarrollado por stivcode
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
