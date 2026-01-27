import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * ProtectedRoute - Enforces authentication and optional role-based access.
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, user, loading } = useAuth();
    const location = useLocation();

    // While checking session (if loading is implemented)
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        // Redirect to login but save the current location they were trying to go to
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user?.role)) {
        // Role not authorized, redirect to home or a generic unauthorized page
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
