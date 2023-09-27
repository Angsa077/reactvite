import { useEffect, useState } from "react";
import { getUsers } from "../services/AuthService";

export const useLogin = () => {
    const [id, setId] = useState(0);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setId(getUsers(token));
        } else {
            window.location.href = "/login";
        }
    }, []);

    return id;
}