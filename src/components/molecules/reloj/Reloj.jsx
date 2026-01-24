import styles from "./Reloj.module.css";
import useHoraColombia from "@/hooks/useHoraColombia";

const Reloj = () => {
  const horaActual = useHoraColombia();
  const horaFormateada = (() => {
    if (!horaActual) return "";
    const [hora, minuto] = horaActual.split(":");
    if (!hora || !minuto) return horaActual;
    const horaNumero = Number(hora);
    if (Number.isNaN(horaNumero)) return horaActual;
    const esPM = horaNumero >= 12;
    const hora12 = ((horaNumero + 11) % 12) + 1;
    return `${hora12.toString().padStart(2, "0")}:${minuto} ${
      esPM ? "pm" : "am"
    }`;
  })();

  return <p className={styles.hour}>{horaFormateada}</p>;
};

export default Reloj;
