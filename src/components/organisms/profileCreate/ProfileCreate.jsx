import { useState } from "react";
import styles from "./ProfileCreate.module.css";
import Button from "@/components/templates/button/Button";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useNotification } from "@/context/notificationProvider/notificationProvider";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/supabase/supabase";
import bcrypt from "bcryptjs";
import createLockersAdmins from "@/utils/createLockersAdmins";
import { useLoader } from "@/context/loaderProvider/LoaderProvider";

const ProfileCreate = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const notify = useNotification();
  const { toggleLoader } = useLoader();
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
      toggleLoader(true);
      // Obtener el usuario autenticado
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        notify("Error", "No se pudo obtener el usuario autenticado.");
        return;
      }

      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insertar en la tabla 'admins'
      const { error: insertError } = await supabase.from("admins").insert({
        id: user.id,
        email: user.email,
        password: hashedPassword,
      });

      if (insertError) {
        notify("Error", "No se pudo guardar la contraseña.");
        console.log(insertError);
        return;
      }

      // Crear casilleros para el admin
      await createLockersAdmins(user.id);

      setPassword("");
      setConfirmPassword("");
      notify("Success", "Perfil creado correctamente.");
      navigate("/home");
    } catch (error) {
      notify("Error", "Error al guardar los datos, intente nuevamente.");
      console.log(error);
    } finally {
      toggleLoader(false);
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
        <label className={styles.label}>Contraseña:</label>
        <div className={styles.containerPassword}>
          <input
            className={styles.input}
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            id="contrasena1"
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

        <label className={styles.label}>Confirma contraseña:</label>
        <div className={styles.containerPassword}>
          <input
            className={styles.input}
            type={showPassword ? "text" : "password"}
            onChange={(e) => setConfirmPassword(e.target.value)}
            id="contrasena2"
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
