import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;
        if (decoded.exp && decoded.exp < now) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            return <Navigate to="/login" replace />;
        }
    } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
