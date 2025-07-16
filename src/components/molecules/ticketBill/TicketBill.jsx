import { CarFront, HandCoins, History } from "lucide-react";
import styles from "./TicketBill.module.css";

const TicketBill = ({ selected, tiempoPasado, valorAPagar }) => {
  return (
    <>
      <div className={styles.containerItems}>
        <span className={styles.label}>
          <CarFront />
          Placa
        </span>
        <span className={styles.placa}>{selected ? selected : "---"}</span>
      </div>
      <div className={styles.containerItems}>
        <span className={styles.label}>
          <History />
          Tiempo
        </span>
        <span className={styles.time}>
          {tiempoPasado ? tiempoPasado : "..."}
        </span>
      </div>
      <div className={styles.containerItems}>
        <span className={styles.label}>
          <HandCoins />
          Valor a pagar
        </span>
        <span className={styles.money}>{valorAPagar}</span>
      </div>
    </>
  );
};

export default TicketBill;
