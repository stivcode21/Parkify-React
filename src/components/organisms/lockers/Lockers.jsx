import Locker from "@/components/templates/locker/Locker";
import styles from "./Lockers.module.css";
import { useNotification } from "@/components/templates/notificationProvider/notificationProvider";
import { supabase } from "@/supabase/supabase";
import { useEffect, useState } from "react";
import { useLoader } from "@/context/loaderProvider/LoaderProvider";

const Lockers = () => {
  const [lockers, setLockers] = useState([]);
  const notify = useNotification();
  const { toggleLoader } = useLoader();

  useEffect(() => {
    const fetchLockers = async () => {
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

      // Consultar la tabla 'lockers' para obtener los vehículos del usuario
      const { data: dataLockers, error } = await supabase
        .from("casilleros")
        .select("*")
        .eq("id_user", user.id)
        .order("id_locker", { ascending: true });

      if (error) {
        notify("Error", "Error al obtener Lockers");
        console.error("Error al obtener lockers:", error);
      } else {
        setLockers(dataLockers);
        console.log("Lockers:", dataLockers);
      }
      toggleLoader(false);
    };

    fetchLockers();
  }, []);

  return (
    <div className={styles.lockers}>
      {lockers.map((locker, index) => (
        <Locker
          key={index}
          number={locker.id_locker}
          placa={locker.placa}
          state={locker.estado}
        />
      ))}
    </div>
  );
};

export default Lockers;
