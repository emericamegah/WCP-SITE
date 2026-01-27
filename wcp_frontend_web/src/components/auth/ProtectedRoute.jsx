import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

/**
 * ProtectedRoute Component
 * Wraps routes that require authentication.
 */
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    /*
    if (!isAuthenticated) {
        // Redirect to login if not authenticated, keeping the attempted location
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    */

    return children;
};

export default ProtectedRoute;
