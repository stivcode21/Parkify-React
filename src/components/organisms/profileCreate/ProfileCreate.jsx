import styles from "./ProfileCreate.module.css";
import Button from "@/components/templates/button/Button";

const ProfileCreate = () => {
  return (
    <>
      <h1 className={styles.title}>CREAR PERFIL</h1>
      <form className={styles.form}>
        <label className={styles.label} for="usuario">
          Tu nombre de usuario es:{" "}
          <span className={styles.strong}>your_name</span>
        </label>
        <input
          className={styles.input}
          type="text"
          id="usuario"
          name="usuario"
        />

        <label className={styles.label} for="contrasena">
          Contraseña:
        </label>
        <input
          className={styles.input}
          type="password"
          id="contrasena"
          name="contrasena"
        />

        <label className={styles.label} for="contrasena">
          Confirma Contraseña:
        </label>
        <input
          className={styles.input}
          type="password"
          id="contrasena"
          name="contrasena"
        />

        <div className={styles.button}>
          <Button name="Acceder" />
        </div>
      </form>
    </>
  );
};

export default ProfileCreate;
