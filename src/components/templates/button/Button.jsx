import styles from "./Button.module.css";

function Button({ onClick, name }) {
  return (
    <button className={styles.button} onClick={onClick}>
      {name}
    </button>
  );
}

export default Button;
