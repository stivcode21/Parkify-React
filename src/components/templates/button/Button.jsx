import styles from "./Button.module.css";

function Button({ onClick, name }) {
  return (
    <div className={styles.button} onClick={onClick}>
      {name}
    </div>
  );
}

export default Button;
