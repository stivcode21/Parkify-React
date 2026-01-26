import { useEffect, useState } from "react";
import styles from "./VehicleList.module.css";
import CounterVehicles from "@/components/molecules/counterVehicles/CounterVehicles";
import { formatDateTime } from "@/utils/formatDate";
import { getElapsedTime } from "@/utils/getElapsedTime";
import { buildApiUrl } from "@/utils/apiBase";
import RowListVehicles from "@/components/molecules/rowListVehicles/RowListVehicles";
import TicketBill from "@/components/molecules/ticketBill/TicketBill";
import { useNotification } from "@/context/notificationProvider/notificationProvider";
import { useLoader } from "@/context/loaderProvider/LoaderProvider";
import ExitModal from "@/components/atoms/exitModal/ExitModal";
import TicketModal from "@/components/templates/ticketModal/TicketModal";
import VehicleExit from "@/components/organisms/vehicleExit/VehicleExit";

const VehicleList = ({ showExit = true, showHeader = true }) => {
  const [vehiculos, setVehiculos] = useState([]);
  const [selected, setSelected] = useState(null);
  const [ticketData, setTicketData] = useState(null);
  const { toggleLoader } = useLoader();
  const notify = useNotification();

  const refreshVehicles = async () => {
    toggleLoader(true);

    try {
      const res = await fetch(buildApiUrl("vehicles/list"), {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        notify("Error", "No se pudieron obtener los vehiculos.");
        return;
      }
      const data = await res.json();
      const vehiclesList = data?.vehicles || [];
      setVehiculos(vehiclesList);
    } catch (error) {
      console.error("Error al obtener vehiculos:", error);
      notify("Error", "Error al obtener los vehiculos.");
    }
    toggleLoader(false);
  };

  useEffect(() => {
    refreshVehicles();
    const handler = () => refreshVehicles();
    window.addEventListener("vehicles:updated", handler);
    return () => window.removeEventListener("vehicles:updated", handler);
  }, []);

  const handleOpenDetails = (vehicle) => {
    const fechaEntrada = formatDateTime(vehicle?.fecha_entrada);
    const tiempoPasado = getElapsedTime(fechaEntrada);
    setSelected(vehicle?.placa || null);
    setTicketData({
      placa: vehicle?.placa,
      tiempo: tiempoPasado?.texto,
      entrada: fechaEntrada,
      tipoVehiculo: vehicle?.tipo,
      casillero: vehicle?.id_casillero || "---",
    });
  };

  const handleCloseTicket = () => {
    setTicketData(null);
    setSelected(null);
  };

  return (
    <div className={`${styles.layout} ${showHeader ? styles.fullHeight : ""}`}>
      {ticketData ? (
        <TicketModal onClose={handleCloseTicket}>
          <TicketBill
            variant="info"
            selected={ticketData?.placa}
            tiempoPasado={ticketData?.tiempo}
            entrada={ticketData?.entrada}
            tipoVehiculo={ticketData?.tipoVehiculo}
            casillero={ticketData?.casillero}
          />
        </TicketModal>
      ) : null}
      {showHeader ? (
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            {showExit ? <ExitModal route="/dashboard" /> : null}
          </div>
        </header>
      ) : null}

      <div className={`${styles.listPanel}`}>
        <div className={styles.listTopbar}>
          <div className={styles.secondaryActions}>
            <VehicleExit />
          </div>
          <div className={styles.listMeta}>
            <span className={styles.listTitle}>Lista de Vehiculos</span>
            <span className={styles.activeBadge}>
              Activos {vehiculos.length}
            </span>
            <CounterVehicles vehicles={vehiculos} variant="compact" />
          </div>
        </div>
        <div className={styles.listBody}>
          <div className={styles.tableCard}>
            <table>
              <thead>
                <tr className={styles.headerRow}>
                  <th>Placa</th>
                  <th>Vehiculo</th>
                  <th>Casillero</th>
                  <th>Fecha/Entrada</th>
                </tr>
              </thead>
              <tbody>
                {vehiculos.map((vehicle, index) => (
                  <RowListVehicles
                    selected={selected}
                    onRowClick={() => handleOpenDetails(vehicle)}
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
        </div>
      </div>
    </div>
  );
};

export default VehicleList;
