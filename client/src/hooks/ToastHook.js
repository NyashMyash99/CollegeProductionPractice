import { useCallback } from "react";

export const useToast = () => {
    return useCallback((message) => {
        if(window.M && message) window.M.toast({ html: message });
    }, []);
};

