import axios from "axios";
import useAuthStore from "../stores/auth.store";
import { useEffect } from "react";

const instance = axios.create({
    baseURL: "/",
});

const useAxios = () => {
    const { auth } = useAuthStore();

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
