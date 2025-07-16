import React from "react";
import styles from "./ParkifyLogo.module.css";

const ParkifyLogo = () => {
  return (
    <h1 className={styles.title}>
      Parki<span className={styles.strong}>fy</span>
    </h1>
  );
};

export default ParkifyLogo;
