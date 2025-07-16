import React from "react";
import styles from "./CounterVehicles.module.css";
import { vehicles } from "@/data/dataVehicles";

const CounterVehicles = () => {
  const vehiclesCount = vehicles.filter(
    (vehicle) => vehicle.tipo === "Carro"
  ).length;
  const motorcyclesCount = vehicles.filter(
    (vehicle) => vehicle.tipo === "Moto"
  ).length;
  return (
    <div className={styles.container}>
      <div className={styles.counter}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M15 5a1 1 0 0 1 .894.553l3.225 6.449l.08.003A4 4 0 1 1 15 16l.005-.2a4 4 0 0 1 2.111-3.33l-.557-1.115l-3.352 3.352A1 1 0 0 1 12.5 15H8.874q.124.481.126 1a4 4 0 1 1-8 0l.005-.2a4 4 0 0 1 6.33-3.049L9.084 11H6a1 1 0 0 1-.993-.883L5 10a1 1 0 0 1 1-1h9.381l-1-2H13a1 1 0 0 1-.993-.883L12 6a1 1 0 0 1 1-1z"
          />
        </svg>
        <span className={styles.span}>{motorcyclesCount}</span>
      </div>
      <div className={styles.counter}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m20.772 10.155l-1.368-4.104A2.995 2.995 0 0 0 16.559 4H7.441a2.995 2.995 0 0 0-2.845 2.051l-1.368 4.104A2 2 0 0 0 2 12v5c0 .738.404 1.376 1 1.723V21a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2h12v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2.277A1.99 1.99 0 0 0 22 17v-5a2 2 0 0 0-1.228-1.845M7.441 6h9.117c.431 0 .813.274.949.684L18.613 10H5.387l1.105-3.316A1 1 0 0 1 7.441 6M5.5 16a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 5.5 16m13 0a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 18.5 16"
          />
        </svg>
        <span className={styles.span}>{vehiclesCount}</span>
      </div>
    </div>
  );
};

export default CounterVehicles;
