import { CarFront } from "lucide-react";
import styles from "./TicketBill.module.css";

const TicketBill = ({
  variant = "info",
  selected,
  tiempoPasado,
  valorAPagar,
  entrada,
  salida,
  tipoVehiculo,
  casillero,
}) => {
  const isExit = variant === "exit";
  const ticketDate = isExit ? salida : entrada;
  const barcodeValue = selected ? selected.toUpperCase() : "000000";

  return (
    <section className={`${styles.ticket} ${isExit ? styles.exit : styles.info}`}>
      <header className={styles.header}>
        <img
          className={styles.logo}
          src="/parking-info.svg"
          alt="Icono parking"
        />
        <div className={styles.headerText}>
          <span className={styles.brand}>Parkify</span>
          <span className={styles.title}>
            {isExit ? "Recibo de salida" : "Ticket de ingreso"}
          </span>
          <span className={styles.date}>{ticketDate || "---"}</span>
        </div>
        <span className={styles.badge}>{isExit ? "Salida" : "Ingreso"}</span>
      </header>

      <div className={styles.divider} />

      <div className={styles.plateBlock}>
        <span className={styles.label}>
          <CarFront size={16} />
          Placa
        </span>
        <span className={styles.plate}>{selected ? selected : "---"}</span>
      </div>

      <div className={styles.details}>
        {isExit ? (
          <>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Entrada</span>
              <span className={styles.detailValue}>{entrada || "---"}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Salida</span>
              <span className={styles.detailValue}>{salida || "---"}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Tiempo total</span>
              <span className={styles.detailValue}>
                {tiempoPasado || "---"}
              </span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Total</span>
              <span className={styles.detailValueStrong}>
                {valorAPagar || "$0"}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Vehiculo</span>
              <span className={styles.detailValue}>
                {tipoVehiculo || "---"}
              </span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Casillero</span>
              <span className={styles.detailValue}>{casillero || "---"}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Entrada</span>
              <span className={styles.detailValue}>{entrada || "---"}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Tiempo</span>
              <span className={styles.detailValue}>
                {tiempoPasado || "---"}
              </span>
            </div>
          </>
        )}
      </div>

      <div className={styles.divider} />

      <div className={styles.barcode} aria-hidden="true" />
      <div className={styles.barcodeText}>{barcodeValue}</div>
    </section>
  );
};

export default TicketBill;
