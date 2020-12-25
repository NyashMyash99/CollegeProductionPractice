import { useState, useCallback } from "react";

export const useAPI = () => {
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = "GET", body = null, headers = { }) => {
        try {
            const response = await fetch(`http://ly3.nyashmyash99.ru/${url}`, { method,
                body: (body ? JSON.stringify(body) : null),
                headers: (body ? { ...headers, "Content-Type": "application/json" } : { ...headers })
            });
            const data = await response.json();

            if(!response.ok) return setError(data.message || "Произошла какая-то ошибка..");

            return data;
        } catch (e) { setError(e.message); }
    }, []);

    const clearError = useCallback(() => setError(null), []);

    return { request, error, clearError };
};