import Locker from "@/components/templates/locker/Locker";
import styles from "./Lockers.module.css";
import { useNotification } from "@/context/notificationProvider/notificationProvider";
import { useEffect, useMemo, useState } from "react";
import { useLoader } from "@/context/loaderProvider/LoaderProvider";
import { buildApiUrl } from "@/utils/apiBase";
import useRefreshStore from "@/store/refreshStore.js";

const Lockers = () => {
  const [lockers, setLockers] = useState([]);
  const notify = useNotification();
  const { toggleLoader } = useLoader();
  const { lockersRefreshFlag } = useRefreshStore();

  useEffect(() => {
    const fetchLockers = async () => {
      toggleLoader(true);

      try {
        const res = await fetch(buildApiUrl("lockers"), {
          method: "GET",
          credentials: "include", // importante: envia la cookie
        });

        if (!res.ok) {
          notify("Error", "No se pudieron obtener los casilleros.");
          return;
        }

        const data = await res.json();
        // console.log("Lockers obtenidos:", data.lockers);
        const lockersList = data?.lockers || [];
        setLockers(lockersList);
      } catch (error) {
        console.error("Error al obtener lockers:", error);
        notify("Error", "Error al obtener casilleros.");
      } finally {
        toggleLoader(false);
      }
    };

    fetchLockers();
  }, [lockersRefreshFlag]);

  const stats = useMemo(() => {
    const occupied = lockers.filter((locker) => locker.ocupado).length;
    const available = Math.max(lockers.length - occupied, 0);

    return {
      occupied,
      available,
    };
  }, [lockers]);

  return (
    <div className={styles.layout}>
      <div className={styles.panelHeader}>
        <h3 className={styles.panelTitle}>Casilleros</h3>
        <div className={styles.badges}>
          <span
            className={styles.statusBadge}
            aria-label={`Ocupados ${stats.occupied}`}
            title={`Ocupados: ${stats.occupied}`}
          >
            <span className={`${styles.statusDot} ${styles.dotBusy}`} />
            <span className={styles.statusCount}>{stats.occupied}</span>
          </span>
          <span
            className={styles.statusBadge}
            aria-label={`Disponibles ${stats.available}`}
            title={`Disponibles: ${stats.available}`}
          >
            <span className={`${styles.statusDot} ${styles.dotActive}`} />
            <span className={styles.statusCount}>{stats.available}</span>
          </span>
        </div>
      </div>
      <div className={styles.grid}>
        {lockers.map((locker, index) => (
          <Locker
            key={locker.id}
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
