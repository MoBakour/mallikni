import { create } from "zustand";
import { IAuth } from "../types/types";

interface IAuthState {
    auth: IAuth;
    authorized: boolean;
    setAuth: (newAuth: IAuth) => void;
}

const useAuthStore = create<IAuthState>((set) => {
    const userAuth = JSON.parse(localStorage.getItem("auth") || "null");

    return {
        auth: userAuth,
        authorized: !!userAuth?.userDocument.activation.activated,
        setAuth: (newAuth: IAuth) => {
            set({
                auth: newAuth,
                authorized: !!newAuth?.userDocument.activation.activated,
            });
        },
    };
});

export default useAuthStore;