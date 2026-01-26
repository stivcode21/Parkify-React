import { useEffect, useState } from "react";
import styles from "./HistoryLog.module.css";
import RowListVehicles from "@/components/molecules/rowListVehicles/RowListVehicles";
import { useNotification } from "@/context/notificationProvider/notificationProvider";
import { formatDateTime } from "@/utils/formatDate";
import { useLoader } from "@/context/loaderProvider/LoaderProvider";
import ExitModal from "@/components/atoms/exitModal/ExitModal";
import { buildApiUrl } from "@/utils/apiBase";

const HistoryLog = ({ showExit = true }) => {
  const [vehiculos, setVehiculos] = useState([]);
  const [selected, setSelected] = useState(null);
  const notify = useNotification();
  const { toggleLoader } = useLoader();

  useEffect(() => {
    const fetchVehiculos = async () => {
      toggleLoader(true);
      try {
        const res = await fetch(buildApiUrl("vehicles/records"), {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) {
          notify("Error", "No se pudieron obtener los vehiculos.");
          return;
        }
        const data = await res.json();
        setVehiculos(data.vehicles);
      } catch (error) {
        console.error("Error al obtener vehiculos:", error);
        notify("Error", "Error al obtener los vehiculos.");
      }
      toggleLoader(false);
    };

    fetchVehiculos();
  }, []);

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          {showExit ? <ExitModal route="/dashboard" /> : null}
        </div>
      </header>
      <div className={styles.listPanel}>
        <div className={styles.listTopbar}>
          <div className={styles.secondaryActions}></div>
          <div className={styles.listMeta}>
            <span className={styles.listTitle}>Historial de registro</span>
            <span className={styles.activeBadge}>
              Registros {vehiculos.length}
            </span>
          </div>
        </div>
        <div className={styles.listBody}>
          <div className={styles.tableCard}>
            <table>
              <thead>
                <tr className={styles.headerRow}>
                  <th>Placa</th>
                  <th>Vehiculo</th>
                  <th>Fecha/Entrada</th>
                  <th>Fecha/Salida</th>
                  <th>Pago</th>
                </tr>
              </thead>
              <tbody>
                {vehiculos.map((vehicle, index) => (
                  <RowListVehicles
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
      </div>
    </div>
  );
};

export default HistoryLog;
