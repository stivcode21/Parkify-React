import styles from "./Locker.module.css";

const Locker = ({ number, placa, state }) => {
  return (
    <div className={`${styles.locker} ${state && styles.off}`}>
      <div className={styles.chart}>
        <p>{number}</p>
      </div>
      <div className={`${styles.bars} ${styles.bars1}`}></div>
      <div className={`${styles.bars} ${styles.bars2}`}></div>
      <div className={`${styles.bars} ${styles.bars3}`}></div>
      <div className={styles.lock}></div>
      <div
        className={`${styles.circle} ${
          state === false ? styles.busy : styles.active
        } `}
      ></div>
      <div className={styles.description}>
        <p className={styles.placa}>{placa}</p>
      </div>
    </div>
  );
};

export default Locker;
