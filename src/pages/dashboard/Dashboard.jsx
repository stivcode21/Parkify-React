import LogoParkify from "@/components/atoms/logoParkify/LogoParkify";
import styles from "./Dashboard.module.css";
import Reloj from "@/components/molecules/reloj/Reloj";
import ActuallyDate from "@/components/molecules/actuallyDate/ActuallyDate";
import ModalOverlay from "@/components/templates/modalOverlay/ModalOverlay";
import BoxButtons from "@/components/molecules/boxButtons/BoxButtons";

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

        <BoxButtons />
        <ModalOverlay />

        <footer className={styles.footer}>
          © 2025 desarrollado por stivcode
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
