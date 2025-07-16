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
      <h1 class={styles.title}>INICIAR SESION</h1>
      <form class={styles.form}>
        <label class={styles.label} for="usuario">
          Correo:
        </label>
        <input
          class={styles.input}
          type="text"
          id="usuario"
          name="usuario"
          autocomplete="username"
        />

        <label class={styles.label} for="contrasena">
          Contraseña:
        </label>
        <input
          class={styles.input}
          type="password"
          id="contrasena"
          name="contrasena"
          autocomplete="current-password"
        />

        <div class={styles.button}>
          <Button onClick={send} name="Acceder" />
        </div>
      </form>
    </>
  );
};

export default SignIn;
