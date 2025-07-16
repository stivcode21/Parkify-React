import styles from "./ButtonModal.module.css";
import useModalStore from "@/store/ModalStore";

const ButtonModal = ({ exit = false, name, component }) => {
  const { setModalContent } = useModalStore();

  const handleClick = () => {
    if (exit) {
      window.location.href = "/login";
    } else {
      setModalContent(component); // pasamos el componente como contenido del modal
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
