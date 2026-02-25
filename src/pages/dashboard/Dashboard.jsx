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
            <VehicleList showExit={false} showHeader={false} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
