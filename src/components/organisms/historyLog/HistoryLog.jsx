import { useEffect, useState } from "react";
import styles from "./HistoryLog.module.css";
import RowListVehicles from "@/components/molecules/rowListVehicles/RowListVehicles";
import ParkifyLogo from "@/components/atoms/parkifyLogo/ParkifyLogo";
import { useNotification } from "@/context/notificationProvider/notificationProvider";
import { supabase } from "@/supabase/supabase";
import { useLoader } from "@/context/loaderProvider/LoaderProvider";

const HistoryLog = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [selected, setSelected] = useState(null);
  const notify = useNotification();
  const { toggleLoader } = useLoader();

  useEffect(() => {
    const fetchVehiculos = async () => {
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

      // Consultar la tabla 'vehiculo' para obtener los vehículos del usuario
      const { data: dataVehicles, error: errorVehicles } = await supabase
        .from("historial")
        .select("*")
        .eq("id_user", user.id);

      if (errorVehicles) {
        notify("Error", "Error al obtener vehículos");
        console.error("Error al obtener vehículos:", error);
      } else {
        setVehiculos(dataVehicles);
      }
      toggleLoader(false);
    };

    fetchVehiculos();
  }, []);

  return (
    <>
      <ParkifyLogo />
      <h2 className={styles.title}>Historial de registro</h2>
      <div className={styles.container}>
        <div className={styles.column1}>
          <table>
            <thead>
              <tr className={styles.header}>
                <th>Placa</th>
                <th>Vehículo</th>
                <th>Fecha/Entrada</th>
                <th>Fecha/Salida</th>
                <th>Pago</th>
              </tr>
            </thead>
            <tbody>
              {vehiculos.map((vehicle, index) => (
                <RowListVehicles
                  selected={selected}
                  setSelected={setSelected}
                  history={true}
                  placaID={vehicle.placa}
                  vehiculo={vehicle.tipo}
                  fecha={vehicle.fechaEntrada}
                  salida={vehicle.fechaSalida}
                  pago={vehicle.pago}
                  key={index}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default HistoryLog;
