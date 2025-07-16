import React from "react";
import styles from "./ButtonSend.module.css";

const ButtonSend = ({ onClick, name }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      {name}
    </button>
  );
};

export default ButtonSend;
