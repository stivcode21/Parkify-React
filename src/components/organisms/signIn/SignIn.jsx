import Button from "@/components/templates/button/Button";
import styles from "./SignIn.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SignIn = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user, password);
  };
  return (
    <>
      <h1 className={styles.title}>INICIAR SESION</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>Usuario:</label>
        <input
          className={styles.input}
          type="text"
          id="usuario"
          name="usuario"
          onChange={(e) => setUser(e.target.value)}
        />

        <label className={styles.label}>Contraseña:</label>
        <input
          className={styles.input}
          type="password"
          id="contrasena"
          name="contrasena"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className={styles.button}>
          <Button name="Acceder" />
        </div>
      </form>
    </>
  );
};

export default SignIn;
