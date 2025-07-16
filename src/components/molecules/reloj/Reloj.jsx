import styles from "./Reloj.module.css";
import useHoraColombia from "@/hooks/useHoraColombia";

const Reloj = () => {
  const horaActual = useHoraColombia();

  return <p className={styles.hour}>{horaActual}</p>;
};

export default Reloj;
