import ExitModal from "@/components/atoms/exitModal/ExitModal";
import styles from "./ModalOverlay.module.css";
import { motion } from "framer-motion";
import useModalStore from "@/store/ModalStore";

const ModalOverlay = () => {
  const { modalContent, closeModal } = useModalStore();

  if (!modalContent) return null;

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          delay: 0.05,
          ease: [0.215, 0.61, 0.355, 1],
        }}
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <ExitModal />
        <div className={styles.content}>{modalContent}</div>
      </motion.div>
    </div>
  );
};

export default ModalOverlay;
