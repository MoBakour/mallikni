import { create } from "zustand";

interface ICommonStore {
    showSideMenu: boolean;
    setShowSideMenu: (newShowSideMenu: boolean) => void;
}

const useCommonStore = create<ICommonStore>((set) => ({
    showSideMenu: true,
    setShowSideMenu: (newShowSideMenu: boolean) => {
        set({ showSideMenu: newShowSideMenu });
    },
}));

export default useCommonStore;
