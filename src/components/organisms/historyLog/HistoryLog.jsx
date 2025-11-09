import { useEffect, useState } from "react";
import styles from "./HistoryLog.module.css";
import RowListVehicles from "@/components/molecules/rowListVehicles/RowListVehicles";
import ParkifyLogov2 from "@/components/atoms/parkifyLogov2/ParkifyLogov2";
import { useNotification } from "@/context/notificationProvider/notificationProvider";
import { formatDateTime } from "@/utils/formatDate";
import { useLoader } from "@/context/loaderProvider/LoaderProvider";

const HistoryLog = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [selected, setSelected] = useState(null);
  const notify = useNotification();
  const { toggleLoader } = useLoader();

  useEffect(() => {
    const fetchVehiculos = async () => {
      toggleLoader(true);
      try {
        const res = await fetch("http://localhost:3000/api/vehicles/records", {
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

  console.log("Vehículos en estado de historial:", vehiculos);

  return (
    <>
      <ParkifyLogov2 />
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
              {vehiculos.map((vehicle, index) => (
                <RowListVehicles
                  // selected={selected}
                  // setSelected={setSelected}
                  history={true}
                  placaID={vehicle.placa}
                  vehiculo={vehicle.tipo}
                  fecha={formatDateTime(vehicle.fecha_entrada)}
                  salida={formatDateTime(vehicle.fecha_salida)}
                  pago={vehicle.monto_total}
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
