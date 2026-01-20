import { useNavigate } from "react-router-dom";
import styles from "./ButtonModal.module.css";
import useModalStore from "@/store/ModalStore";
import { useNotification } from "@/context/notificationProvider/notificationProvider";
import { buildApiUrl } from "@/utils/apiBase";

const ButtonModal = ({ exit = false, name, component, path = null }) => {
  const { setModalContent } = useModalStore();
  const navigate = useNavigate();
  const notify = useNotification();

  const handleClick = async () => {
    if (path && !exit) {
      navigate(path);
      return;
    }

    if (exit) {
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
    } else {
      setModalContent(component);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`${styles.button} ${exit ? styles.salida : ""}`}
    >
      {name}
    </button>
  );
};

export default ButtonModal;
