import Button from "@/components/templates/button/Button";
import styles from "./SignUp.module.css";
import { useState } from "react";
import { useNotification } from "@/components/templates/notificationProvider/notificationProvider";

const SignUp = () => {
  const [correo, setCorreo] = useState("");
  const notify = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //validacion para no enviar vacio
    if (!correo.trim()) {
      notify("Warning", "Por favor, ingresa un correo.");
      return;
    }

    try {
      console.log(correo);
      setCorreo("");
      notify("Success", "Correo enviado correctamente");
    } catch (error) {
      notify("Error", "Error al enviar el correo, intente nuevamente.");
    }
  };

  return (
    <>
      <h1 className={styles.title}>CREAR PERFIL</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>Correo:</label>
        <input
          className={styles.input}
          type="text"
          id="correo"
          name="correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />

        <div className={styles.button}>
          <Button name="Acceder" />
        </div>
      </form>
    </>
  );
};

export default SignUp;
