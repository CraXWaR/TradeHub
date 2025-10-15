import {createContext, useState, useEffect, useContext} from "react";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const applyToken = (rawToken) => {
        if (!rawToken) {
            localStorage.removeItem("token");
            setUser(null);
            setToken(null);
            return;
        }

        const storedToken = rawToken.startsWith("Bearer ")
            ? rawToken.slice(7)
            : rawToken;

        try {
            const decoded = jwtDecode(storedToken);
            const now = Date.now() / 1000;

            if (decoded?.exp && decoded.exp < now) {
                localStorage.removeItem("token");
                setUser(null);
                setToken(null);
                return
            }

            setUser({
                id: decoded.id,
                role: decoded.role,
                email: decoded.email,
                name: decoded.name,
                created_at: decoded.created_at,
                updated_at: decoded.updated_at,
            });
            setToken(storedToken);
            localStorage.setItem("token", storedToken);
        } catch {
            localStorage.removeItem("token");
            setUser(null);
            setToken(null);
        }
    };

    const login = (jwt) => {
        applyToken(jwt);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
    };

    useEffect(() => {
        const existing = localStorage.getItem("token");
        applyToken(existing);
        setLoading(false);

        const onStorage = (e) => {
            if (e.key === "token") applyToken(e.newValue);
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    const isAuthenticated = !!token && !!user;
    const isAdmin = user?.role === "admin";

    return (
        <AuthContext.Provider value={{
            user,
            token,
            setUser,
            setToken,
            loading,
            login,
            logout,
            isAuthenticated,
            isAdmin,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
