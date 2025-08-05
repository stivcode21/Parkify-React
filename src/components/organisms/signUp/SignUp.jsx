import Button from "@/components/templates/button/Button";
import styles from "./SignUp.module.css";
import { useState } from "react";
import { useNotification } from "@/components/templates/notificationProvider/notificationProvider";
import { supabase } from "@/supabase/supabase";
import { useLoader } from "@/context/loaderProvider/LoaderProvider";

const SignUp = () => {
  const [correo, setCorreo] = useState("");
  const [sent, setSent] = useState(false);
  const notify = useNotification();
  const { toggleLoader } = useLoader();

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
      toggleLoader(true);

      const { error } = await supabase.auth.signInWithOtp({
        email: correo,
      });

      if (error) throw error;

      setCorreo("");
      setSent(true);
      notify("Success", "Correo enviado correctamente");
    } catch (error) {
      console.log(error);
      notify("Error", "Error al enviar el correo, intente nuevamente.");
    } finally {
      toggleLoader(false);
    }
  };

  return (
    <>
      <h1 className={styles.title}>REGISTRARSE</h1>{" "}
      <h2 className={styles.subtitle}>
        Para registrarte, primero debes{" "}
        <strong>autenticar tu correo electrónico.</strong> Te llegara un{" "}
        <strong>enlace de verificación,</strong> y continua con el registro.
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
          {sent ? (
            <p className={styles.successMessage}>
              ✅ Correo enviado. Revisa tu bandeja de entrada.
            </p>
          ) : (
            <Button name="Enviar Correo" />
          )}
        </div>
      </form>
    </>
  );
};

export default SignUp;
