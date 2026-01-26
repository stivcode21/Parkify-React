import { useNavigate } from "react-router-dom";
import styles from "./ButtonModal.module.css";
import useModalStore from "@/store/ModalStore";

const ButtonModal = ({ name, component, path = null }) => {
  const { setModalContent } = useModalStore();
  const navigate = useNavigate();

  const handleClick = async () => {
    if (path) {
      navigate(path);
      return;
    }

    setModalContent(component);
  };

  return (
    <button onClick={handleClick} className={`${styles.button}`}>
      {name}
    </button>
  );
};

export default ButtonModal;
