import Locker from "@/components/templates/locker/Locker";
import styles from "./Lockers.module.css";

const Lockers = () => {
  return (
    <div className={styles.lockers}>
      {Array.from({ length: 36 }).map((_, index) => (
        <Locker key={index} number={index + 1} />
      ))}
    </div>
  );
};

export default Lockers;
