import Button from "@/components/templates/button/Button";
import styles from "./WelcomePage.module.css";
import MainParkifyLogo from "@/components/atoms/mainParkifyLogo/MainParkifyLogo";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/signIn");
  };
  return (
    <div className={styles.container}>
      <div className={styles.containerTitle}>
        <MainParkifyLogo />
      </div>
      <img src="/bgAutos.png" alt="background" className={styles.cars} />
      <div className={styles.button}>
        <Button onClick={handleSubmit} name="Iniciar" />
      </div>
      <footer className={styles.footer}>
        © 2025 desarrollado por stivcode
      </footer>
    </div>
  );
};

export default WelcomePage;
