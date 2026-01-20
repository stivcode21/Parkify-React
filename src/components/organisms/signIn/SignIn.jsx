import Button from "@/components/templates/button/Button";
import styles from "./SignIn.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNotification } from "@/context/notificationProvider/notificationProvider";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useLoader } from "@/context/loaderProvider/LoaderProvider";
import { checkAuth } from "@/utils/auth";
import { buildApiUrl } from "@/utils/apiBase";

const SignIn = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

  useEffect(() => {
    const verifySession = async () => {
      const loggedIn = await checkAuth();
      if (loggedIn) {
        navigate("/dashboard"); // redirige si ya tiene cookie v�lida
      }
    };
    verifySession();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      toggleLoader(true);
      const res = await fetch(buildApiUrl("auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // importante para que guarde la cookie
        body: JSON.stringify({ email: correo, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        notify("Error", data.message);
        return;
      }

      notify("Success", data.message);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error en inicio de sesion:", error);
      notify("Error", "Ha ocurrido un error inesperado.");
    } finally {
      toggleLoader(false);
    }
  };

  return (
    <>
      <h1 className={styles.title}>INICIAR SESION</h1>
      <h2 className={styles.subtitle}>
        Ingresa tu <strong>correo</strong> y <strong>contraseña</strong> para
        que podamos enviarte un enlace de acceso si las credenciales son
        validas.
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
        {/* <span className={styles.link} onClick={() => navigate("/signUp")}>
          Crear un perfil
        </span> */}
      </form>
    </>
  );
};

export default SignIn;
