import Button from "@/components/templates/button/Button";
import styles from "./WelcomePage.module.css";
import LogoParkify from "@/components/atoms/logoParkify/LogoParkify";

const WelcomePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerTitle}>
        <LogoParkify />
      </div>
      <img src="/bgAutos.png" alt="background" className={styles.cars} />
      <div className={styles.button}>
        <Button name="Iniciar" />
      </div>
      <footer className={styles.footer}>
        © 2025 desarrollado por stivcode
      </footer>
    </div>
  );
};

export default WelcomePage;
