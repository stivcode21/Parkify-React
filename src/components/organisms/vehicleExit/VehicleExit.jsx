import React from "react";
import styles from "./VehicleExit.module.css";
import ParkifyLogo from "@/components/atoms/parkifyLogo/ParkifyLogo";
import ButtonSend from "@/components/atoms/buttonSend/ButtonSend";

const VehicleExit = () => {
  return (
    <>
      <ParkifyLogo />
      <h2 className={styles.title}>Salida de Vehículos</h2>
      <div className={styles.container}>
        <div className={styles.containerPlaca}>
          <span className={styles.labelPlaca}>Placa</span>
          <input className={styles.input} type="text" />
        </div>

        <ButtonSend name="Buscar" />
      </div>
    </>
  );
};

export default VehicleExit;
