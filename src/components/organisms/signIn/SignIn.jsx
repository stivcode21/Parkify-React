import Button from "@/components/templates/button/Button";
import styles from "./SignIn.module.css";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const send = () => {
    navigate("/hero");
  };
  return (
    <>
      <h1 className={styles.title}>INICIAR SESION</h1>
      <form className={styles.form}>
        <label className={styles.label} for="usuario">
          Usuario:
        </label>
        <input
          className={styles.input}
          type="text"
          id="usuario"
          name="usuario"
          autocomplete="username"
        />

        <label className={styles.label} for="contrasena">
          Contraseña:
        </label>
        <input
          className={styles.input}
          type="password"
          id="contrasena"
          name="contrasena"
          autocomplete="current-password"
        />

        <div className={styles.button}>
          <Button onClick={send} name="Acceder" />
        </div>
      </form>
    </>
  );
};

export default SignIn;
