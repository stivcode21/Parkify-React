import styles from "./ExitModal.module.css";
import useModalStore from "@/store/ModalStore";

const ExitModal = () => {
  const { closeModal } = useModalStore();

  return (
    <button className={styles.closeButton} onClick={closeModal}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-x-icon lucide-x"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </button>
  );
};

export default ExitModal;
