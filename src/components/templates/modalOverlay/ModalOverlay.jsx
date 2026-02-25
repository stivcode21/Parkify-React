import ExitModal from "@/components/atoms/exitModal/ExitModal";
import styles from "./ModalOverlay.module.css";
import { motion } from "framer-motion";
import useModalStore from "@/store/ModalStore";
import ParkifyLogov2 from "@/components/atoms/parkifyLogov2/ParkifyLogov2";
import Lockers from "../../organisms/lockers/Lockers";

const ModalOverlay = () => {
  const { modalContent, closeModal } = useModalStore();

  if (!modalContent) return null;

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.2,
          delay: 0.01,
          ease: [0.215, 0.61, 0.355, 1],
        }}
        className={`${styles.modal} ${styles.firstmodal}`}
        onClick={(e) => e.stopPropagation()}
      >
        <Lockers />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.modal}
        transition={{
          duration: 0.2,
          delay: 0.01,
          ease: [0.215, 0.61, 0.355, 1],
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <ExitModal />
          <ParkifyLogov2 />
        </div>
        <div className={styles.body}>
          <div className={styles.content}>{modalContent}</div>
        </div>
      </motion.div>
    </div>
  );
};

export default ModalOverlay;
