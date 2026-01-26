import { useMemo, useState } from "react";
import MainParkifyLogo from "@/components/atoms/mainParkifyLogo/MainParkifyLogo";
import styles from "./Dashboard.module.css";
import Reloj from "@/components/molecules/reloj/Reloj";
import ActuallyDate from "@/components/molecules/actuallyDate/ActuallyDate";
import VehicleList from "@/components/organisms/vehicleList/VehicleList";
import Lockers from "@/components/organisms/lockers/Lockers";
import BoxButtons from "../../components/molecules/boxButtons/BoxButtons";
import UserInfo from "@/components/molecules/userInfo/UserInfo";

const Dashboard = () => {
  const [lockers, setLockers] = useState([]);

  const stats = useMemo(() => {
    const occupied = lockers.filter((locker) => locker.ocupado).length;
    const available = Math.max(lockers.length - occupied, 0);

    return {
      occupied,
      available,
    };
  }, [lockers]);

  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.dateContainer}>
            <Reloj variant="compact" />
            <ActuallyDate variant="compact" />
          </div>
          <div className={styles.logoRow}>
            <img
              src="/auto.svg"
              alt=""
              className={styles.heroIcon}
              aria-hidden="true"
            />
            <MainParkifyLogo />
          </div>
          <UserInfo />
        </header>
        <div className={styles.main}>
          <div className={styles.logoRow2}>
            <img
              src="/auto.svg"
              alt=""
              className={styles.heroIcon}
              aria-hidden="true"
            />
            <MainParkifyLogo />
          </div>
          <section className={styles.hero}>
            <BoxButtons />
          </section>

          <section className={styles.content}>
            <div className={styles.lockersPanel}>
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
                    <span
                      className={`${styles.statusDot} ${styles.dotActive}`}
                    />
                    <span className={styles.statusCount}>
                      {stats.available}
                    </span>
                  </span>
                </div>
              </div>
              <div className={styles.panelBody}>
                <Lockers onLockersLoaded={setLockers} />
              </div>
            </div>

            <VehicleList showExit={false} showHeader={false} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
