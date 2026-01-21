import { useEffect, useState } from "react";
import styles from "./VehicleList.module.css";
import ParkifyLogov2 from "@/components/atoms/parkifyLogov2/ParkifyLogov2";
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

const VehicleList = ({ showExit = true }) => {
  const [vehiculos, setVehiculos] = useState([]);
  const [selected, setSelected] = useState(null);
  const [ticketData, setTicketData] = useState(null);
  const { toggleLoader } = useLoader();
  const notify = useNotification();

  useEffect(() => {
    const fetchVehiculos = async () => {
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
        setVehiculos(data.vehicles);
      } catch (error) {
        console.error("Error al obtener vehiculos:", error);
        notify("Error", "Error al obtener los vehiculos.");
      }
      toggleLoader(false);
    };

    fetchVehiculos();
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
    <div className={styles.layout}>
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
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          {showExit ? <ExitModal route="/dashboard" /> : null}
          <ParkifyLogov2 />
        </div>
        <div className={styles.headerRight}>
          <h2 className={styles.title}>Lista de Vehiculos</h2>

          <div className={styles.summary}>
            <CounterVehicles vehicles={vehiculos} />
          </div>
        </div>
      </header>

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
  );
};

export default VehicleList;
