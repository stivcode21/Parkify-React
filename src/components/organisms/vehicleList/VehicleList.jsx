import { useEffect, useState } from "react";
import styles from "./VehicleList.module.css";
import ParkifyLogov2 from "@/components/atoms/parkifyLogov2/ParkifyLogov2";
import CounterVehicles from "@/components/molecules/counterVehicles/CounterVehicles";
import RowListVehicles from "@/components/molecules/rowListVehicles/RowListVehicles";
import useTiempoTranscurrido from "@/hooks/useTiempoTranscurrido";
import useCalculoPago from "@/hooks/useCalculoPago";
import TicketBill from "@/components/molecules/ticketBill/TicketBill";
import { useNotification } from "@/context/notificationProvider/notificationProvider";
import { supabase } from "@/supabase/supabase";
import { useLoader } from "@/context/loaderProvider/LoaderProvider";

const VehicleList = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [selected, setSelected] = useState(null);
  const { toggleLoader } = useLoader();
  const notify = useNotification();

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
        .from("vehiculo")
        .select(
          `
    placa,
    tipo,
    fecha_entrada,
    casilleros(id_locker)
  `
        )
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

  const vehicleSelected = vehiculos.find((v) => v.placa === selected);
  const tiempoPasado = useTiempoTranscurrido(vehicleSelected?.fecha_entrada);
  const valorAPagar = useCalculoPago(vehicleSelected?.fecha_entrada);

  return (
    <div className={styles.box}>
      <ParkifyLogov2 />
      <h2 className={styles.title}>Lista de Vehículos</h2>
      <CounterVehicles vehicles={vehiculos} />
      <div className={styles.container}>
        <div className={styles.column1}>
          <table>
            <thead>
              <tr className={styles.header}>
                <th>Placa</th>
                <th>Vehículo</th>
                <th>Casillero</th>
                <th>Fecha/Entrada</th>
              </tr>
            </thead>
            <tbody>
              {vehiculos.map((vehicle, index) => (
                <RowListVehicles
                  selected={selected}
                  setSelected={setSelected}
                  placaID={vehicle.placa}
                  vehiculo={vehicle.tipo}
                  fecha={vehicle.fecha_entrada}
                  casillero={vehicle.casilleros[0]?.id_locker || "-"}
                  key={index}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.column2}>
          <TicketBill
            selected={selected}
            tiempoPasado={tiempoPasado}
            valorAPagar={valorAPagar}
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleList;
