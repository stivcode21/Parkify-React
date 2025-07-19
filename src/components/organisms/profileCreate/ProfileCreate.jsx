import { useState } from "react";
import styles from "./ProfileCreate.module.css";
import Button from "@/components/templates/button/Button";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useNotification } from "../../templates/notificationProvider/notificationProvider";
import { useNavigate } from "react-router-dom";

const ProfileCreate = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const notify = useNotification();
  const navigate = useNavigate();

  const validateForm = () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    //validacion para no enviar vacio
    if (!password.trim()) {
      notify("Warning", "Por favor, ingresa tu contraseña.");
      return false;
    }

    if (!passwordRegex.test(password)) {
      notify(
        "Warning",
        "La contraseña debe contener mínimo 8 caracteres, al menos una letra y un número."
      );
      return false;
    }

    if (password !== confirmPassword) {
      notify("Warning", "Las contraseñas no coinciden");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      console.log(password);
      setPassword("");
      notify("Success", "Perfil creado correctamente");
      navigate("/hero");
    } catch (error) {
      notify("Error", "Error al enviar el correo, intente nuevamente.");
    }
  };

  return (
    <>
      <h1 className={styles.title}>CREAR PERFIL</h1>
      <h2 className={styles.subtitle}>
        Ahora que ya autenticaste tu <strong>correo</strong>, crea una{" "}
        <strong>contraseña segura</strong> con al menos{" "}
        <strong>8 caracteres</strong>, una <strong>letra</strong> y un{" "}
        <strong>número</strong>.
      </h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label} for="contrasena">
          Contraseña:
        </label>
        <div className={styles.containerPassword}>
          <input
            className={styles.input}
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            id="contrasena"
            name="contrasena"
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

        <label className={styles.label} for="contrasena">
          Confirma contraseña:
        </label>
        <div className={styles.containerPassword}>
          <input
            className={styles.input}
            type={showPassword ? "text" : "password"}
            onChange={(e) => setConfirmPassword(e.target.value)}
            id="contrasena"
            name="contrasena"
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
      </form>
    </>
  );
};

export default ProfileCreate;
