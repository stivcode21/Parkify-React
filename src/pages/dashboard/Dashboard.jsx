import MainParkifyLogo from "@/components/atoms/mainParkifyLogo/MainParkifyLogo";
import styles from "./Dashboard.module.css";
import Reloj from "@/components/molecules/reloj/Reloj";
import ActuallyDate from "@/components/molecules/actuallyDate/ActuallyDate";
import BoxButtons from "@/components/molecules/boxButtons/BoxButtons";

const Dashboard = () => {
  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        <header className={styles.header}>
          <ActuallyDate />
          <Reloj />
        </header>

        <MainParkifyLogo />
        <img src="/auto.svg" alt="auto-icon" className={styles.auto} />

        <BoxButtons />

        <footer className={styles.footer}>
          © 2025 desarrollado por stivcode
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
