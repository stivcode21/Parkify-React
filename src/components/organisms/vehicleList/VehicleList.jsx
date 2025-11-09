import { useEffect, useState } from "react";
import styles from "./VehicleList.module.css";
import ParkifyLogov2 from "@/components/atoms/parkifyLogov2/ParkifyLogov2";
import CounterVehicles from "@/components/molecules/counterVehicles/CounterVehicles";
import { formatDateTime } from "@/utils/formatDate";
import { calculatePayment } from "@/utils/calculatePayment";
import { getElapsedTime } from "@/utils/getElapsedTime";
import RowListVehicles from "@/components/molecules/rowListVehicles/RowListVehicles";
import TicketBill from "@/components/molecules/ticketBill/TicketBill";
import { useNotification } from "@/context/notificationProvider/notificationProvider";
import { useLoader } from "@/context/loaderProvider/LoaderProvider";
import ExitModal from "@/components/atoms/exitModal/ExitModal";

const VehicleList = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [selected, setSelected] = useState(null);
  const { toggleLoader } = useLoader();
  const notify = useNotification();

  useEffect(() => {
    const fetchVehiculos = async () => {
      toggleLoader(true);

      try {
        const res = await fetch("http://localhost:3000/api/vehicles/list", {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) {
          notify("Error", "No se pudieron obtener los vehículos.");
          return;
        }
        const data = await res.json();
        setVehiculos(data.vehicles);
      } catch (error) {
        console.error("Error al obtener vehículos:", error);
        notify("Error", "Error al obtener los vehículos.");
      }
      toggleLoader(false);
    };

    fetchVehiculos();
  }, []);

  const vehicleSelected = vehiculos.find((v) => v.placa === selected);
  const tiempoPasado = getElapsedTime(
    formatDateTime(vehicleSelected?.fecha_entrada)
  );
  const valorAPagar = calculatePayment(
    formatDateTime(vehicleSelected?.fecha_entrada)
  );

  return (
    <div className={styles.box}>
      <ExitModal route="/dashboard" />
      <ParkifyLogov2 />
      <h2 className={styles.title}>Lista de Vehículos</h2>
      <CounterVehicles vehicles={vehiculos} />
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
              {vehiculos.map((vehicle, index) => (
                <RowListVehicles
                  selected={selected}
                  setSelected={setSelected}
                  placaID={vehicle.placa}
                  vehiculo={vehicle.tipo}
                  fecha={formatDateTime(vehicle.fecha_entrada)}
                  casillero={vehicle?.id_casillero || "-"}
                  key={index}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.column2}>
          <TicketBill
            selected={selected}
            tiempoPasado={tiempoPasado.texto}
            valorAPagar={valorAPagar}
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleList;
