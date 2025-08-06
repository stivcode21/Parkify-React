import Button from "@/components/templates/button/Button";
import styles from "./SignIn.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useNotification } from "@/context/notificationProvider/notificationProvider";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import bcrypt from "bcryptjs";
import { supabase } from "@/supabase/supabase";
import { useLoader } from "@/context/loaderProvider/LoaderProvider";

const SignIn = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [sent, setSent] = useState(false);
  const notify = useNotification();
  const navigate = useNavigate();
  const { toggleLoader } = useLoader();

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
      toggleLoader(true);
      //Verificar existencia de usuario
      const { data: user, error } = await supabase
        .from("admins")
        .select("*")
        .eq("email", correo)
        .single();

      if (error || !user) {
        notify("Error", "Correo no registrado.");
        return;
      }

      // Verificar contraseña
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        notify("Error", "Contraseña incorrecta.");
        return;
      }

      // Enviar Link solo si la autenticación es válida
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email: correo,
        options: {
          shouldCreateUser: false,
        },
      });

      if (otpError) {
        notify("Error", "No se pudo enviar el enlace de acceso.");
        return;
      }

      notify(
        "Success",
        "Usuario válido. Hemos enviado un enlace de verificación a tu correo. Revísalo para continuar."
      );
      setSent(true);
      setCorreo("");
      setPassword("");
    } catch (error) {
      console.error("Error en inicio de sesión:", error);
      notify("Error", "Ha ocurrido un error inesperado.");
    } finally {
      toggleLoader(false);
    }
  };

  return (
    <>
      <h1 className={styles.title}>INICIAR SESIÓN</h1>
      <h2 className={styles.subtitle}>
        Ingresa tu <strong>correo</strong> y <strong>contraseña</strong> para
        que podamos enviarte un enlace de acceso si las credenciales son
        válidas.
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
          {sent ? (
            <p className={styles.successMessage}>
              Hemos enviado un enlace de verificación a tu correo.
            </p>
          ) : (
            <Button name="Acceder" />
          )}
        </div>
        <span className={styles.link} onClick={() => navigate("/signUp")}>
          Crear un perfil
        </span>
      </form>
    </>
  );
};

export default SignIn;
