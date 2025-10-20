import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../hooks/auth/useAuth.js";

const ProtectedRoute = ({children, role}) => {
    const {user, token, loading} = useAuth();

    if (loading) return <div>Loading...</div>;

    if (!token) return <Navigate to="/login" replace/>;

    if (!user) return <div>Loading...</div>;

    if (role && user.role !== role) return <Navigate to="/unauthorized" replace/>;

    return children || <Outlet/>;
};

export default ProtectedRoute;
