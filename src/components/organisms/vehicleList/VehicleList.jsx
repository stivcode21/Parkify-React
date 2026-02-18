import { useEffect, useMemo, useState } from "react";
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
import { ArrowLeft } from "lucide-react";
import { ArrowRight } from "lucide-react";

const VehicleList = ({ showExit = true, showHeader = true }) => {
  const [vehiculos, setVehiculos] = useState([]);
  const [selected, setSelected] = useState(null);
  const [ticketData, setTicketData] = useState(null);
  const [page, setPage] = useState(1);
  const { toggleLoader } = useLoader();
  const notify = useNotification();
  const rowsPerPage = 7;

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

  useEffect(() => {
    const totalPages = Math.max(Math.ceil(vehiculos.length / rowsPerPage), 1);
    if (page > totalPages) setPage(totalPages);
  }, [vehiculos.length, page]);

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

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const totalPages = Math.max(Math.ceil(vehiculos.length / rowsPerPage), 1);
  const pagedVehicles = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return vehiculos.slice(start, start + rowsPerPage);
  }, [page, rowsPerPage, vehiculos]);

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
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {pagedVehicles.map((vehicle, index) => (
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
          <div className={styles.pagination}>
            <button
              type="button"
              className={styles.pageButton}
              onClick={handlePreviousPage}
              disabled={page === 1}
              aria-label="Pagina anterior"
            >
              <ArrowLeft />
            </button>
            <span className={styles.pageNumber}>{`${page} / ${totalPages}`}</span>
            <button
              type="button"
              className={styles.pageButton}
              onClick={handleNextPage}
              disabled={page === totalPages}
              aria-label="Pagina siguiente"
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleList;
