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
import useModalStore from "@/store/ModalStore";

const VehicleList = ({ showExit = true }) => {
  const [vehiculos, setVehiculos] = useState([]);
  const [selected, setSelected] = useState(null);
  const { toggleLoader } = useLoader();
  const notify = useNotification();
  const { setModalContent } = useModalStore();

  useEffect(() => {
    const fetchVehiculos = async () => {
      toggleLoader(true);

      try {
        const res = await fetch("http://localhost:3000/api/vehicles/list", {
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
    const valorAPagar = calculatePayment(fechaEntrada);

    setSelected(vehicle?.placa || null);
    setModalContent(
      <TicketBill
        selected={vehicle?.placa}
        tiempoPasado={tiempoPasado?.texto}
        valorAPagar={valorAPagar}
      />
    );
  };

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          {showExit ? <ExitModal route="/dashboard" /> : null}
          <ParkifyLogov2 />
        </div>
        <div className={styles.headerRight}>
          <div className={styles.summary}>
            <CounterVehicles vehicles={vehiculos} />
          </div>
          <h2 className={styles.title}>Lista de Vehiculos</h2>
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
