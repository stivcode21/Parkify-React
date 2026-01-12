import Locker from "@/components/templates/locker/Locker";
import styles from "./Lockers.module.css";
import { useNotification } from "@/context/notificationProvider/notificationProvider";
import { useEffect, useState } from "react";
import { useLoader } from "@/context/loaderProvider/LoaderProvider";

const Lockers = () => {
  const [lockers, setLockers] = useState([]);
  const notify = useNotification();
  const { toggleLoader } = useLoader();

  useEffect(() => {
    const fetchLockers = async () => {
      toggleLoader(true);

      try {
        const res = await fetch("http://localhost:3000/api/lockers", {
          method: "GET",
          credentials: "include", // importante: envia la cookie
        });

        if (!res.ok) {
          notify("Error", "No se pudieron obtener los casilleros.");
          return;
        }

        const data = await res.json();
        // console.log("Lockers obtenidos:", data.lockers);
        setLockers(data.lockers);
      } catch (error) {
        console.error("Error al obtener lockers:", error);
        notify("Error", "Error al obtener casilleros.");
      } finally {
        toggleLoader(false);
      }
    };

    fetchLockers();
  }, []);

  return (
    <div className={styles.layout}>
      <div className={styles.grid}>
        {lockers.map((locker, index) => (
          <Locker
            key={index}
            number={locker.numero_casillero}
            placa={locker.placa}
            state={locker.ocupado}
          />
        ))}
      </div>
    </div>
  );
};

export default Lockers;
