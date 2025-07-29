import { useNavigate } from "react-router-dom";
import { supabase } from "@/supabase/supabase";
import styles from "./ButtonModal.module.css";
import useModalStore from "@/store/ModalStore";
import { useNotification } from "@/components/templates/notificationProvider/notificationProvider";

const ButtonModal = ({ exit = false, name, component }) => {
  const { setModalContent } = useModalStore();
  const navigate = useNavigate();
  const notify = useNotification();

  const handleClick = async () => {
    if (exit) {
      const { error } = await supabase.auth.signOut();

      if (error) {
        notify("Error", "No se pudo cerrar sesión.");
        console.log(error);
      } else {
        notify("Success", "Sesión cerrada con éxito.");
        navigate("/");
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
