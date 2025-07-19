import Button from "@/components/templates/button/Button";
import styles from "./SignUp.module.css";
import { useState } from "react";
import { useNotification } from "@/components/templates/notificationProvider/notificationProvider";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [correo, setCorreo] = useState("");
  const notify = useNotification();
  const navigate = useNavigate();

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //validacion para no enviar vacio
    if (!correo.trim()) {
      notify("Warning", "Por favor, ingresa tu correo.");
      return false;
    }

    if (!emailRegex.test(correo)) {
      notify("Warning", "El correo no cumple con el formato requerido");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      console.log(correo);
      setCorreo("");
      notify("Success", "Correo enviado correctamente");
      navigate("/createProfile");
    } catch (error) {
      notify("Error", "Error al enviar el correo, intente nuevamente.");
    }
  };

  return (
    <>
      <h1 className={styles.title}>REGISTRARSE</h1>{" "}
      <h2 className={styles.subtitle}>
        Para registrarte, primero debes{" "}
        <strong>autenticar tu correo electrónico.</strong> Te llegara un{" "}
        <strong>enlace de verificación,</strong> sigue las instrucciones para
        continuar con el registro.
      </h2>
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
