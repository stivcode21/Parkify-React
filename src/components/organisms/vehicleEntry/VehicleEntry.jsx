import { useState } from "react";
import styles from "./VehicleEntry.module.css";
import ButtonSend from "@/components/atoms/buttonSend/ButtonSend";
import { useNotification } from "@/context/notificationProvider/notificationProvider";
import { useLoader } from "@/context/loaderProvider/LoaderProvider";
import ParkifyLogov2 from "@/components/atoms/parkifyLogov2/ParkifyLogov2";
import { CarFront, Hash, Tag } from "lucide-react";
import { buildApiUrl } from "@/utils/apiBase";

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
      notify("Warning", "Por favor, ingresa la placa del vehiculo.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      toggleLoader(true);

      const res = await fetch(buildApiUrl("vehicles/entry"), {
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
        notify("Error", data.message || "Error al registrar el vehiculo.");
        return;
      }

      notify("Success", data.message || "Vehiculo ingresado correctamente.");
      window.dispatchEvent(new CustomEvent("vehicles:updated"));

      // Limpiar formulario
      setPlaca("");
      setVehiculo("");
      setCasillero("");
    } catch (error) {
      console.error("Error al registrar vehiculo:", error);
      notify("Error", "Error de conexion con el servidor.");
    } finally {
      toggleLoader(false);
    }
  };

  return (
    <div className={styles.layout}>
      <h2 className={styles.title}>Ingreso de Vehiculos</h2>

      <form className={styles.body}>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>
              <CarFront className={styles.sectionIcon} />
              Tipo de vehiculo
            </span>
            <span className={styles.sectionHelp}>
              Selecciona moto o carro para continuar
            </span>
          </div>
          <div className={styles.containerType} onSubmit={handleSubmit}>
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
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.containerPlaca}>
            <span className={styles.labelPlaca}>
              <Hash className={styles.sectionIcon} />
              Placa
            </span>
            <span className={styles.inputHelp}>Ingresa 6 caracteres</span>
            <input
              className={styles.input}
              type="text"
              value={placa}
              maxLength={6}
              placeholder="_ _ _"
              autoComplete="off"
              onChange={(e) => setPlaca(e.target.value)}
              id="placa"
            />
          </div>
        </div>

        <div className={`${styles.section} ${styles.sectionWide}`}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>
              <Tag className={styles.sectionIcon} />
              Casillero
            </span>
            <span className={styles.sectionHelp}>Opcional, si aplica</span>
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
            <span className={styles.labelLocker}>Casillero</span>
          </div>
        </div>
      </form>

      <div className={styles.actions}>
        <ButtonSend name="Ingresar" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default VehicleEntry;
