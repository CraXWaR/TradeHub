import {useState, useEffect, useCallback} from "react";
import {jwtDecode} from "jwt-decode";
import Context from "./auth-context.js";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const refreshUser = useCallback(async (overrideToken) => {
        const t = overrideToken ?? token;
        if (!t) {
            setUser(null);
            return;
        }
        try {
            const res = await fetch(`${BASE_URL}/api/users/me`, {
                headers: {Authorization: `Bearer ${t}`},
            });
            if (!res.ok) throw new Error("Failed to load user");
            const data = await res.json();
            setUser(data.data);
        } catch {
            setUser(null);
        }
    }, [token]);

    const applyToken = (rawToken) => {
        if (!rawToken) {
            localStorage.removeItem("token");
            setUser(null);
            setToken(null);
            return null;
        }

        const storedToken = rawToken.startsWith("Bearer ") ? rawToken.slice(7) : rawToken;

        try {
            const decoded = jwtDecode(storedToken);
            const now = Date.now() / 1000;
            if (decoded?.exp && decoded.exp < now) {
                localStorage.removeItem("token");
                setUser(null);
                setToken(null);
                return null;
            }
            setToken(storedToken);
            localStorage.setItem("token", storedToken);
            return storedToken;
        } catch {
            localStorage.removeItem("token");
            setUser(null);
            setToken(null);
            return null;
        }
    };

    const login = async (jwt) => {
        const t = applyToken(jwt);
        if (t) await refreshUser(t);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
    };

    useEffect(() => {
        (async () => {
            const existing = localStorage.getItem("token");
            const t = applyToken(existing);
            if (t) {
                await refreshUser(t);
            }
            setLoading(false);
        })();

        const onStorage = (e) => {
            if (e.key === "token") {
                const t = applyToken(e.newValue);
                if (t) refreshUser(t);
            }
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    useEffect(() => {
        if (token) refreshUser(token);
    }, [token, refreshUser]);

    const isAuthenticated = !!token && !!user;
    const isAdmin = user?.role === "admin";

    return (
        <Context.Provider value={{
            user, token, setUser, setToken, loading, login, logout,
            isAuthenticated, isAdmin, refreshUser
        }}>
            {children}
        </Context.Provider>
    );
}
