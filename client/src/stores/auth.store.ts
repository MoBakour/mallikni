import { create } from "zustand";
import { IAuth } from "../types/types";

interface IAuthState {
    auth: IAuth | null;
    authorized: boolean;
    setAuth: (newAuth: IAuth | null) => void;
}

const useAuthStore = create<IAuthState>((set) => {
    const userAuth = JSON.parse(localStorage.getItem("auth") || "null");

    return {
        auth: userAuth,
        authorized: !!userAuth?.user.activation.activated,
        setAuth: (newAuth: IAuth | null) => {
            localStorage.setItem("auth", JSON.stringify(newAuth));
            set({
                auth: newAuth,
                authorized: !!newAuth?.user.activation.activated,
            });
        },
    };
});

export default useAuthStore;
