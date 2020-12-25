import { useState, useEffect, useCallback } from "react";
import { useAPI } from "./APIHook";
import { useToast } from "./ToastHook";

export const useAuth = () => {
    const [account, setAccount] = useState({ });
    const { request, error, clearError } = useAPI();
    const toast = useToast();

    const checkAccount = useCallback(async (data, lazy = true) => {
        const account = await request("api/account/check", "POST", data);
        if(!account) return;

        if(lazy) {
            const elements = document.querySelectorAll(".animation");
            elements.forEach((elem) => elem.classList.add("animation-out"));
            setTimeout(() => setAccount(account), elements.length > 0 ? 1000 : 0);
        }

        localStorage.setItem("nmauth", JSON.stringify(account));
    }, [request]);

    useEffect(() => {
        const auth = localStorage.getItem("nmauth");
        if(!auth) return;
        checkAccount(JSON.parse(auth), false);
    }, [checkAccount]);

    const login = useCallback((data) => {
        checkAccount(data);
    }, [checkAccount]);

    const logout = useCallback(() => {
        const elements = document.querySelectorAll(".animation");
        elements.forEach((elem) => elem.classList.add("animation-out"));
        setTimeout(() => setAccount({ }), elements.length > 0 ? 1000 : 0);

        localStorage.removeItem("nmauth");
    }, []);

    useEffect(() => {
        toast(error); clearError();
    }, [error, toast, clearError]);

    return { login, logout, account };
};
