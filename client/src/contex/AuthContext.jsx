import {createContext, useState, useEffect, useContext} from "react";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
    };

    useEffect(() => {
        const checkAuth = () => {
            const storedToken = localStorage.getItem("token");

            if (!storedToken) {
                setUser(null);
                setToken(null);
                setLoading(false);
                return;
            }

            try {
                const decoded = jwtDecode(storedToken);
                const now = Date.now() / 1000;

                if (decoded?.exp && decoded.exp < now) {
                    // expired
                    localStorage.removeItem("token");
                    setUser(null);
                    setToken(null);
                } else {
                    // put anything you encode into the token here
                    setUser({id: decoded.id, role: decoded.role, email: decoded.email, name: decoded.name});
                    setToken(storedToken);
                }
            } catch {
                localStorage.removeItem("token");
                setUser(null);
                setToken(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
        window.addEventListener("storage", checkAuth);
        return () => window.removeEventListener("storage", checkAuth);
    }, []);

    const isAuthenticated = !!token && !!user;
    const isAdmin = user?.role === "admin";

    return (<AuthContext.Provider
        value={{user, token, setUser, setToken, loading, logout, isAuthenticated, isAdmin}}
    >
        {children}
    </AuthContext.Provider>);
};

export const useAuth = () => useContext(AuthContext);
