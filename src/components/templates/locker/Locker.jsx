import styles from "./Locker.module.css";

const Locker = ({ number }) => {
  return (
    <div className={styles.locker}>
      <div className={styles.chart}>
        <p>{number}</p>
      </div>
      <div className={`${styles.bars} ${styles.bars1}`}></div>
      <div className={`${styles.bars} ${styles.bars2}`}></div>
      <div className={`${styles.bars} ${styles.bars3}`}></div>
      <div className={styles.lock}></div>
      <div className={styles.circle}></div>
      <div className={styles.description}>
        {/* <p className={styles.placa}>ODM72G</p> */}
      </div>
    </div>
  );
};

export default Locker;
