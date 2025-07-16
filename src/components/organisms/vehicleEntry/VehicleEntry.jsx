import React, { useState } from "react";
import styles from "./VehicleEntry.module.css";
import ParkifyLogo from "@/components/atoms/parkifyLogo/ParkifyLogo";
import ButtonSend from "@/components/atoms/buttonSend/ButtonSend";

const VehicleEntry = () => {
  const [vehiculo, setVehiculo] = useState("moto");

  const handleChange = (e) => {
    setVehiculo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Vehículo seleccionado:", vehiculo);
  };

  return (
    <>
      <ParkifyLogo />
      <h2 className={styles.title}>Ingreso de Vehículos</h2>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            <input
              type="radio"
              name="vehiculo"
              value="moto"
              checked={vehiculo === "moto"}
              onChange={handleChange}
            />
            <span>Moto</span>
          </label>

          <label className={styles.label}>
            <input
              type="radio"
              name="vehiculo"
              value="carro"
              checked={vehiculo === "carro"}
              onChange={handleChange}
            />
            <span>Carro</span>
          </label>
        </form>

        <div className={styles.containerPlaca}>
          <span className={styles.labelPlaca}>Placa</span>
          <input className={styles.input} type="text" />
        </div>

        <div className={styles.containerLocker}>
          <input
            className={`${styles.input} ${styles.inputLocker}`}
            type="text"
          />
          <span className={styles.labelLocker}>N° Casillero</span>
        </div>
        <ButtonSend name="Ingresar" />
      </div>
    </>
  );
};

export default VehicleEntry;
