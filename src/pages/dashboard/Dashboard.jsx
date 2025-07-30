import LogoParkify from "@/components/atoms/logoParkify/LogoParkify";
import styles from "./Dashboard.module.css";
import Reloj from "@/components/molecules/reloj/Reloj";
import ActuallyDate from "@/components/molecules/actuallyDate/ActuallyDate";
import ModalOverlay from "@/components/templates/modalOverlay/ModalOverlay";
import BoxButtons from "@/components/molecules/boxButtons/BoxButtons";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/supabase/supabase";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!supabase.auth.getSession) {
      navigate("/signIn");
    }
  }, []);

  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        <header className={styles.header}>
          <ActuallyDate />
          <Reloj />
        </header>

        <LogoParkify />
        <img src="/auto.svg" alt="auto-icon" className={styles.auto} />

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
