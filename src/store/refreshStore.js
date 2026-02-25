import { create } from "zustand";

const useRefreshStore = create((set) => ({
  lockersRefreshFlag: 0,
  triggerLockersRefresh: () =>
    set((state) => ({ lockersRefreshFlag: state.lockersRefreshFlag + 1 })),
}));

export default useRefreshStore;
