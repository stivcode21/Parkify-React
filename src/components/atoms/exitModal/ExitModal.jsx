import { ArrowLeft } from "lucide-react";
import styles from "./ExitModal.module.css";
import useModalStore from "@/store/ModalStore";
import { useNavigate } from "react-router-dom";

const ExitModal = ({ route }) => {
  const { closeModal } = useModalStore();
  const navigate = useNavigate();

  const toggleExit = () => {
    const isRoute = route !== undefined;
    isRoute ? navigate(route) : closeModal();
  };

  return (
    <button className={styles.closeButton} onClick={toggleExit}>
      <ArrowLeft />
    </button>
  );
};

export default ExitModal;
