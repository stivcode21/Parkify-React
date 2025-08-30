import { useState } from "react";
import styles from "./VehicleEntry.module.css";
import ParkifyLogo from "@/components/atoms/parkifyLogo/ParkifyLogo";
import ButtonSend from "@/components/atoms/buttonSend/ButtonSend";
import { useNotification } from "@/context/notificationProvider/notificationProvider";
import { supabase } from "@/supabase/supabase";
import useClickDateTime from "@/hooks/useClickDate";
import { useLoader } from "@/context/loaderProvider/LoaderProvider";

const VehicleEntry = () => {
  const [vehiculo, setVehiculo] = useState("");
  const [placa, setPlaca] = useState("");
  const [casillero, setCasillero] = useState("");
  const { toggleLoader } = useLoader();
  const notify = useNotification();
  const captureDate = useClickDateTime();

  const validateForm = () => {
    const inputPlaca = document.getElementById("placa");
    const inputCasillero = document.getElementById("casillero");
    inputPlaca.maxLength = "6";
    inputCasillero.maxLength = "2";

    //validacion para no enviar vacio
    if (!vehiculo.trim()) {
      notify("Warning", "Por favor, selecciona tipo de vehiculo.");
      return false;
    }

    if (placa.length < 6) {
      notify("Warning", "Por favor, ingresa una placa correcta.");
      return false;
    }

    if (!placa.trim()) {
      notify("Warning", "Por favor, ingresa la placa del vehículo.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const fecha = captureDate();

    try {
      toggleLoader(true);
      // Obtener el usuario
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        notify("Error", "No se pudo obtener el usuario autenticado.");
        return;
      }

      // Insertar en la tabla 'vehiculos'
      const { error: insertError } = await supabase.from("vehiculo").insert({
        placa: placa.toUpperCase(),
        tipo: vehiculo,
        fecha_entrada: fecha,
        id_user: user.id,
      });

      //validar si el casillero existe y esta libre solo si se ingreso un casillero
      if (casillero.trim()) {
        const { data } = await supabase
          .from("casilleros")
          .select("*")
          .eq("id_locker", casillero)
          .eq("estado", false)
          .eq("id_user", user.id)
          .single();

        // Si el casillero existe y está libre, actualizarlo
        if (data) {
          const { error: lockerError } = await supabase
            .from("casilleros")
            .update({
              placa: placa.toUpperCase(),
              estado: true,
            })
            .eq("id_locker", casillero)
            .eq("id_user", user.id);

          if (lockerError) {
            console.error("Error al actualizar el casillero:", lockerError);
          } else {
            notify("Success", "Casillero asignado correctamente.");
          }
        } else {
          notify("Info", "Casillero ya esta ocupado.");
          return;
        }
      }

      if (insertError) {
        notify(
          "Warning",
          "Ocurrio un problema al ingresar el vehiculo, por favor intente nuevamente."
        );
        console.log(insertError);
        return;
      }

      setPlaca("");
      setVehiculo("");
      setCasillero("");
      notify("Success", "Vehiculo ingresado correctamente.");
    } catch (error) {
      notify("Error", "Error al guardar los datos, intente nuevamente.");
      console.log(error);
    } finally {
      toggleLoader(false);
    }
  };

  return (
    <>
      <ParkifyLogo />
      <h2 className={styles.title}>Ingreso de Vehículos</h2>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            <input
              type="radio"
              name="vehiculo"
              className={styles.inputRadio}
              value="moto"
              checked={vehiculo === "moto"}
              onChange={(e) => setVehiculo(e.target.value)}
            />
            <span
              className={`${vehiculo === "moto" ? styles.vehicleState : ""}`}
            >
              Moto
            </span>
          </label>

          <label className={styles.label}>
            <input
              type="radio"
              name="vehiculo"
              className={styles.inputRadio}
              value="carro"
              checked={vehiculo === "carro"}
              onChange={(e) => setVehiculo(e.target.value)}
            />
            <span
              className={`${vehiculo === "carro" ? styles.vehicleState : ""}`}
            >
              Carro
            </span>
          </label>
        </form>

        <div className={styles.containerPlaca}>
          <span className={styles.labelPlaca}>Placa</span>
          <input
            className={styles.input}
            type="text"
            value={placa}
            maxLength={6}
            placeholder="_ _ _"
            autoComplete="off"
            onChange={(e) => setPlaca(e.target.value)}
            id="placa"
            autoFocus
          />
        </div>

        <div className={styles.containerLocker}>
          <input
            className={`${styles.input} ${styles.inputLocker}`}
            type="text"
            value={casillero}
            placeholder="00"
            autoComplete="off"
            onChange={(e) => setCasillero(e.target.value)}
            id="casillero"
            maxLength={2}
          />
          <span className={styles.labelLocker}> Casillero</span>
        </div>
        <ButtonSend name="Ingresar" onClick={handleSubmit} />
      </div>
    </>
  );
};

export default VehicleEntry;
