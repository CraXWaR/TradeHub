import {createContext, useState, useEffect, useContext} from "react";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true); // 👈 add loading state

    useEffect(() => {
        const checkAuth = () => {
            const storedToken = localStorage.getItem("token");

            if (storedToken) {
                try {
                    const decoded = jwtDecode(storedToken);
                    const now = Date.now() / 1000;

                    if (decoded.exp && decoded.exp < now) {
                        localStorage.removeItem("token");
                        setUser(null);
                        setToken(null);
                    } else {
                        setUser({id: decoded.id, role: decoded.role});
                        setToken(storedToken);
                    }
                } catch {
                    localStorage.removeItem("token");
                    setUser(null);
                    setToken(null);
                }
            } else {
                setUser(null);
                setToken(null);
            }

            setLoading(false); // 👈 mark as finished
        };

        checkAuth();
        window.addEventListener("storage", checkAuth);
        return () => window.removeEventListener("storage", checkAuth);
    }, []);

    return (
        <AuthContext.Provider value={{user, token, setUser, setToken, loading}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
