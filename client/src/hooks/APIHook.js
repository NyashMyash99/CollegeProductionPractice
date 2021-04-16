import { useState, useCallback } from "react";

export const useAPI = () => {
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = "GET", body = null, headers = { }) => {
        try {
            // TODO: Заменить на порт, указанный в ../config.ts.
            const response = await fetch(`http://localhost:80/${url}`, { method,
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
