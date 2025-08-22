import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const user = localStorage.getItem('user');

    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
