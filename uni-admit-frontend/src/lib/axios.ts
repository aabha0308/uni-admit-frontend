import axios from "axios";
import { getAccessToken } from "./auth";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "/api",
    withCredentials: false,
});

api.interceptors.request.use(
    (config) => {
        const token = getAccessToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        /*
         * Let the browser/Axios set the correct Content-Type.
         *
         * For JSON requests Axios will handle application/json.
         * For FormData requests the browser must generate:
         * multipart/form-data; boundary=...
         */
        if (config.data instanceof FormData) {
            delete config.headers["Content-Type"];
        } else if (!config.headers["Content-Type"]) {
            config.headers["Content-Type"] = "application/json";
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default api;