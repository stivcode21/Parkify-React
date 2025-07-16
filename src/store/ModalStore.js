import { create } from "zustand";

const useModalStore = create((set) => ({
  modalContent: null,
  setModalContent: (content) => set({ modalContent: content }),
  closeModal: () => set({ modalContent: null }),
}));

export default useModalStore;
