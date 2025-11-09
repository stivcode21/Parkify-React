import { useState } from "react";
import styles from "./VehicleEntry.module.css";
import ButtonSend from "@/components/atoms/buttonSend/ButtonSend";
import { useNotification } from "@/context/notificationProvider/notificationProvider";
import { useLoader } from "@/context/loaderProvider/LoaderProvider";
import ParkifyLogov2 from "@/components/atoms/parkifyLogov2/ParkifyLogov2";

const VehicleEntry = () => {
  const [vehiculo, setVehiculo] = useState("");
  const [placa, setPlaca] = useState("");
  const [casillero, setCasillero] = useState("");
  const { toggleLoader } = useLoader();
  const notify = useNotification();

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

    try {
      toggleLoader(true);

      const res = await fetch("http://localhost:3000/api/vehicles/entry", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          placa: placa.toUpperCase(),
          tipo: vehiculo,
          numeroLocker: casillero || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        notify("Error", data.message || "Error al registrar el vehículo.");
        return;
      }

      notify("Success", data.message || "Vehículo ingresado correctamente.");

      // ✅ Limpiar formulario
      setPlaca("");
      setVehiculo("");
      setCasillero("");
    } catch (error) {
      console.error("Error al registrar vehículo:", error);
      notify("Error", "Error de conexión con el servidor.");
    } finally {
      toggleLoader(false);
    }
  };

  return (
    <>
      <ParkifyLogov2 />
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
