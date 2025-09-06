import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../contex/AuthContext";

const ProtectedRoute = ({children, role}) => {
    const {user, token, loading} = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user || !token) {
        return <Navigate to="/login" replace/>;
    }

    if (role && user.role !== role) {
        return <Navigate to="/unauthorized" replace/>;
    }

    return children ? children : <Outlet/>;
};

export default ProtectedRoute;
