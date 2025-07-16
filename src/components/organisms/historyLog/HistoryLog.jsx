import React, { useState } from "react";
import styles from "./HistoryLog.module.css";
import RowListVehicles from "@/components/molecules/rowListVehicles/RowListVehicles";
import ParkifyLogo from "@/components/atoms/parkifyLogo/ParkifyLogo";
import { Vehicles } from "@/data/dataHistory";

const HistoryLog = () => {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <ParkifyLogo />
      <h2 className={styles.title}>Historial de registro</h2>
      <div className={styles.container}>
        <div className={styles.column1}>
          <table>
            <thead>
              <tr className={styles.header}>
                <th>Placa</th>
                <th>Vehículo</th>
                <th>Fecha/Entrada</th>
                <th>Fecha/Salida</th>
                <th>Pago</th>
              </tr>
            </thead>
            <tbody>
              {Vehicles.map((vehicle, index) => (
                <RowListVehicles
                  selected={selected}
                  setSelected={setSelected}
                  history={true}
                  placaID={vehicle.placa}
                  vehiculo={vehicle.tipo}
                  fecha={vehicle.fecha}
                  salida={vehicle.fechaSalida}
                  pago={vehicle.pago}
                  key={index}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default HistoryLog;
