import { useEffect, useState } from "react";
import { Settings } from "lucide-react";
import { buildApiUrl } from "@/utils/apiBase";
import styles from "./UserInfo.module.css";
import { useNavigate } from "react-router-dom";
import { useNotification } from "@/context/notificationProvider/notificationProvider";

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const notify = useNotification();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const resDashboard = await fetch(buildApiUrl("auth/dashboard"), {
          method: "GET",
          credentials: "include",
        });

        if (!resDashboard.ok) return;

        const data = await resDashboard.json();
        if (!data.user?.email) return;

        const res = await fetch(buildApiUrl("auth/admin"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email: data.user.email }),
        });

        if (!res.ok) return;

        const adminRes = await res.json();
        if (adminRes?.user) {
          setUser(adminRes.user);
        }
      } catch (error) {
        console.error("Error al obtener usuario:", error);
      }
    };

    fetchUser();
  }, []);

  const userName = user?.name;
  const userRole = user?.role;
  const userPhoto = user?.img;

  const handleClick = async () => {
    try {
      const res = await fetch(buildApiUrl("auth/logout"), {
        method: "POST", // usamos POST para cerrar sesión
        credentials: "include", // importante para que la cookie httpOnly se envíe
      });

      const data = await res.json();

      if (!res.ok) {
        notify("Error", data.message || "No se pudo cerrar sesión.");
        return;
      }

      notify("Success", data.message || "Sesión cerrada con éxito.");
      navigate("/"); // redirige al inicio o login
    } catch (error) {
      console.error("Error en logout:", error);
      notify("Error", "Ha ocurrido un error inesperado.");
    }
  };

  return (
    <div className={styles.userWrapper}>
      <div className={styles.userContainer}>
        <div className={styles.userCard}>
          <div className={styles.userAvatar}>
            {userPhoto ? (
              <img src={userPhoto} alt={`Foto de ${userName}`} />
            ) : (
              <span className={styles.userInitials}>{"A"}</span>
            )}
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{userName}</span>
            <span className={styles.userRole}>{userRole}</span>
          </div>
        </div>
        <button
          type="button"
          className={styles.userSettings}
          aria-label="Configuracion"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <Settings className={styles.settingsIcon} />
        </button>
      </div>
      <div
        className={`${styles.userMenu} ${menuOpen ? styles.userMenuOpen : ""}`}
        role="menu"
        aria-hidden={!menuOpen}
      >
        <button type="button" className={styles.menuItem} role="menuitem">
          Configuracion
        </button>
        <button
          type="button"
          className={`${styles.menuItem} ${styles.menuDanger}`}
          role="menuitem"
          onClick={() => handleClick()}
        >
          Cerrar sesion
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
