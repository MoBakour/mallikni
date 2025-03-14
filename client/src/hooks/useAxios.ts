import axios from "axios";
import useAuthStore from "../stores/auth.store";
import { useEffect } from "react";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL as string,
});

const useAxios = () => {
    const auth = useAuthStore((state) => state.auth);

    useEffect(() => {
        const intercept = instance.interceptors.request.use(
            (config) => {
                if (auth) {
                    config.headers.Authorization = `Bearer ${auth.token}`;
                }

                return config;
            },
            (err: Error) => {
                return Promise.reject(err);
            }
        );

        return () => {
            instance.interceptors.request.eject(intercept);
        };
    }, [auth]);

    return instance;
};

export default useAxios;
