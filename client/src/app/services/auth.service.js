import localStorageService from "./localStorage.service";
import configFile from "../config.json";
import axios from "axios";

const httpAuth = axios.create({
    baseURL: configFile.apiEndpoint + "auth/"
});

const authService = {
    register: async (payload) => {
        const { data } = await httpAuth.post(`signUp`, payload);
        return data;
    },
    login: async ({ email, password }) => {
        const { data } = await httpAuth.post(`signInWithPassword`, {
            email,
            password
        });
        return data;
    },
    refresh: async () => {
        const { data } = await httpAuth.post("token", {
            refresh_token: localStorageService.getRefreshToken()
        });
        return data;
    }
};

export default authService;
