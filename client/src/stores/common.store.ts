import { create } from "zustand";

interface ICommonStore {
    showSideMenu: boolean;
    setShowSideMenu: (newShowSideMenu: boolean) => void;
}

const useCommonStore = create<ICommonStore>((set, get) => ({
    showSideMenu: false,
    setShowSideMenu: (newShowSideMenu: boolean) => {
        set({ showSideMenu: newShowSideMenu });
    },
}));

export default useCommonStore;
