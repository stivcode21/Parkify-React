import Button from "@/components/templates/button/Button";
import styles from "./SignIn.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useNotification } from "@/components/templates/notificationProvider/notificationProvider";
import { EyeClosedIcon, EyeIcon } from "lucide-react";

const SignIn = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const notify = useNotification();
  const navigate = useNavigate();

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //validacion para no enviar vacio
    if (!correo.trim()) {
      notify("Warning", "Por favor, ingresa tu correo.");
      return false;
    }
    if (!password.trim()) {
      notify("Warning", "Por favor, ingresa tu contraseña.");
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
      console.log(correo, password);
      setCorreo("");
      setPassword("");
      notify("Success", "Usuario registrado correctamente");
    } catch (error) {
      notify("Error", "Error al enviar el correo, intente nuevamente.");
    }
  };

  return (
    <>
      <h1 className={styles.title}>INICIAR SESION</h1>
      <h2 className={styles.subtitle}>
        ¿Ya tienes cuenta? Inicia sesión con tu <strong>correo</strong> y{" "}
        <strong>contraseña.</strong>
      </h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>Correo:</label>
        <input
          className={styles.input}
          type="text"
          id="usuario"
          name="usuario"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />

        <label className={styles.label}>Contraseña:</label>
        <div className={styles.containerPassword}>
          <input
            className={styles.input}
            type={showPassword ? "text" : "password"}
            id="contrasena"
            name="contrasena"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            type="button"
            className={styles.btn_icon}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeClosedIcon className={styles.icon} />
            ) : (
              <EyeIcon className={styles.icon} />
            )}
          </span>
        </div>

        <div className={styles.button}>
          <Button name="Acceder" />
        </div>
        <span className={styles.link} onClick={() => navigate("/signUp")}>
          Crear un perfil
        </span>
      </form>
    </>
  );
};

export default SignIn;
