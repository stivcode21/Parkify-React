import styles from "./VehicleExit.module.css";
import ParkifyLogo from "@/components/atoms/parkifyLogo/ParkifyLogo";
import ButtonSend from "@/components/atoms/buttonSend/ButtonSend";
import { useNotification } from "@/context/notificationProvider/notificationProvider";
import { supabase } from "@/supabase/supabase";
import useClickDateTime from "@/hooks/useClickDate";
import useCalculoPago from "@/hooks/useCalculoPago";
import TicketBill from "@/components/molecules/ticketBill/TicketBill";
import useTiempoTranscurrido from "@/hooks/useTiempoTranscurrido";
import { useState } from "react";
import { useLoader } from "@/context/loaderProvider/LoaderProvider";

const VehicleExit = () => {
  const [dataVehiculo, setDataVehiculo] = useState(null);
  const [placa, setPlaca] = useState("");
  const [ticketBill, setTicketBill] = useState(false);
  const { toggleLoader } = useLoader();
  const notify = useNotification();
  const captureDate = useClickDateTime();

  const fechaActual = captureDate();
  const valorAPagar = useCalculoPago(dataVehiculo?.fecha_entrada);
  const tiempoPasado = useTiempoTranscurrido(dataVehiculo?.fecha_entrada);

  const validateForm = () => {
    if (placa.trim().length !== 6) {
      notify("Warning", "Por favor, ingresa una placa válida de 6 caracteres.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      toggleLoader(true);
      // Obtener el usuario autenticado
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        notify("Error", "No se pudo obtener el usuario autenticado.");
        return;
      }

      const { data: dataVehicle, error } = await supabase
        .from("vehiculo")
        .select("*")
        .eq("placa", placa.toUpperCase())
        .eq("id_user", user.id)
        .single();

      if (error || !dataVehicle) {
        notify("Warning", "Vehículo no encontrado.");
        return;
      }

      setDataVehiculo(dataVehicle);
      setTicketBill(true);
      setPlaca("");
    } catch (err) {
      console.error(err);
      notify("Error", "Error al buscar el vehículo.");
    } finally {
      toggleLoader(false);
    }
  };

  const handleExitVehicle = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      notify("Error", "No se pudo obtener el usuario autenticado.");
      return;
    }

    try {
      //  Insertar en historial
      const { error: insertError } = await supabase.from("historial").insert({
        placa: dataVehiculo.placa,
        tipo: dataVehiculo.tipo,
        fechaEntrada: dataVehiculo.fecha_entrada,
        fechaSalida: fechaActual,
        pago: valorAPagar,
        id_user: user.id,
      });

      if (insertError) throw insertError;

      // Liberar casillero
      const { error: lockerError } = await supabase
        .from("casilleros")
        .update({
          placa: null,
          estado: false,
        })
        .eq("placa", dataVehiculo.placa)
        .eq("id_user", user.id);

      if (lockerError) throw lockerError;

      // Eliminar vehículo
      const { error: deleteError } = await supabase
        .from("vehiculo")
        .delete()
        .eq("placa", dataVehiculo.placa)
        .eq("id_user", user.id);

      if (deleteError) throw deleteError;

      notify("Success", "Vehículo dado de salida correctamente.");
      setDataVehiculo(null);
      setTicketBill(false);
    } catch (error) {
      console.error("Error al procesar la salida:", error);
      notify("Error", "Ocurrió un error al procesar la salida.");
    }
  };

  return (
    <>
      <ParkifyLogo />
      <h2 className={styles.title}>Salida de Vehículos</h2>
      <div className={styles.container}>
        {ticketBill ? (
          <div className={styles.column1}>
            <TicketBill
              selected={dataVehiculo?.placa}
              tiempoPasado={tiempoPasado}
              valorAPagar={valorAPagar}
            />
            <div className={styles.containerButton}>
              <ButtonSend name="Salida" onClick={handleExitVehicle} />
            </div>
          </div>
        ) : (
          <div className={styles.column2}>
            <div className={styles.containerPlaca}>
              <span className={styles.labelPlaca}>Placa</span>
              <input
                className={styles.input}
                type="text"
                value={placa}
                onChange={(e) => setPlaca(e.target.value)}
                maxLength={6}
                id="placa"
              />
            </div>
            <ButtonSend name="Buscar" onClick={handleSubmit} />
          </div>
        )}
      </div>
    </>
  );
};

export default VehicleExit;
