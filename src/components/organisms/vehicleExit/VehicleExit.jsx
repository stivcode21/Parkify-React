import styles from "./VehicleExit.module.css";
import ParkifyLogov2 from "@/components/atoms/parkifyLogov2/ParkifyLogov2";
import ButtonSend from "@/components/atoms/buttonSend/ButtonSend";
import { useNotification } from "@/context/notificationProvider/notificationProvider";
import TicketBill from "@/components/molecules/ticketBill/TicketBill";
import { useState } from "react";
import { useLoader } from "@/context/loaderProvider/LoaderProvider";
import { getElapsedTime } from "@/utils/getElapsedTime";
import { formatDateTime } from "@/utils/formatDate";
import { calculatePayment } from "@/utils/calculatePayment";
import { buildApiUrl } from "@/utils/apiBase";
import TicketModal from "@/components/templates/ticketModal/TicketModal";

const VehicleExit = () => {
  const [dataVehiculo, setDataVehiculo] = useState(null);
  const [placa, setPlaca] = useState("");
  const [ticketOpen, setTicketOpen] = useState(false);
  const { toggleLoader } = useLoader();
  const notify = useNotification();

  const entrada = formatDateTime(dataVehiculo?.fecha_entrada);
  const salida = formatDateTime(new Date());
  const tiempoPasado = getElapsedTime(entrada);
  const valorAPagar = calculatePayment(entrada);
  console.log("Tiempo pasado:", valorAPagar);

  const validateForm = () => {
    if (placa.trim().length !== 6) {
      notify("Warning", "Por favor, ingresa una placa valida de 6 caracteres.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      toggleLoader(true);
      const res = await fetch(buildApiUrl("vehicles/search"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          placa: placa.toUpperCase(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        notify("Error", data.message || "Error al buscar el vehiculo.");
        return;
      }
      setDataVehiculo(data.vehicle);

      setTicketOpen(true);
      setPlaca("");
    } catch (err) {
      console.error(err);
      notify("Error", "Error al buscar el vehiculo.");
    } finally {
      toggleLoader(false);
    }
  };

  const handleExitVehicle = async () => {
    try {
      toggleLoader(true);
      const res = await fetch(buildApiUrl("vehicles/exit"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          placa: dataVehiculo.placa,
          total: valorAPagar,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        notify("Error", data.message || "Error al registrar el vehiculo.");
        return;
      }

      notify("Success", "Vehiculo dado de salida correctamente.");
      setTicketOpen(false);
      setDataVehiculo(null);
      setPlaca("");
    } catch (err) {
      console.error(err);
      notify("Error", "Error al buscar el vehiculo.");
    } finally {
      toggleLoader(false);
    }
  };

  return (
    <div className={styles.layout}>
      <h2 className={styles.title}>Salida de Vehiculos</h2>

      <div className={styles.body}>
        <div className={styles.searchSection}>
          <div className={styles.field}>
            <span className={styles.labelPlaca}>Placa</span>
            <input
              className={styles.input}
              type="text"
              value={placa}
              placeholder="_ _ _"
              onChange={(e) => setPlaca(e.target.value)}
              maxLength={6}
              id="placa"
              autoFocus
            />
          </div>
          <div className={styles.actions}>
            <ButtonSend name="Buscar" onClick={handleSubmit} />
          </div>
        </div>
      </div>
      {ticketOpen ? (
        <TicketModal onClose={() => setTicketOpen(false)}>
          <div className={styles.ticketModalContent}>
            <TicketBill
              variant="exit"
              selected={dataVehiculo?.placa}
              tiempoPasado={tiempoPasado?.texto}
              valorAPagar={valorAPagar}
              entrada={entrada}
              salida={salida}
            />
            <div className={styles.ticketModalActions}>
              <ButtonSend name="Salida" onClick={handleExitVehicle} />
            </div>
          </div>
        </TicketModal>
      ) : null}
    </div>
  );
};

export default VehicleExit;
