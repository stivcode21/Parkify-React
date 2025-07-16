import { useState } from "react";
import styles from "./VehicleList.module.css";
import ParkifyLogo from "@/components/atoms/parkifyLogo/ParkifyLogo";
import CounterVehicles from "@/components/molecules/counterVehicles/CounterVehicles";
import RowListVehicles from "@/components/molecules/rowListVehicles/RowListVehicles";
import { vehicles } from "@/data/dataVehicles";
import useTiempoTranscurrido from "@/hooks/useTiempoTranscurrido";
import useCalculoPago from "@/hooks/useCalculoPago";
import TicketBill from "@/components/molecules/ticketBill/TicketBill";

const VehicleList = () => {
  const [selected, setSelected] = useState(null);

  const vehicleSelected = vehicles.find((v) => v.placa === selected);
  const tiempoPasado = useTiempoTranscurrido(vehicleSelected?.fecha);
  const valorAPagar = useCalculoPago(vehicleSelected?.fecha);

  return (
    <>
      <ParkifyLogo />
      <h2 className={styles.title}>Lista de Vehículos</h2>
      <CounterVehicles />
      <div className={styles.container}>
        <div className={styles.column1}>
          <table>
            <thead>
              <tr className={styles.header}>
                <th>Placa</th>
                <th>Vehículo</th>
                <th>Casillero</th>
                <th>Fecha/Entrada</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle, index) => (
                <RowListVehicles
                  selected={selected}
                  setSelected={setSelected}
                  placaID={vehicle.placa}
                  vehiculo={vehicle.tipo}
                  fecha={vehicle.fecha}
                  casillero={vehicle.casillero}
                  key={index}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.column2}>
          <TicketBill
            selected={selected}
            tiempoPasado={tiempoPasado}
            valorAPagar={valorAPagar}
          />
        </div>
      </div>
    </>
  );
};

export default VehicleList;
