import React from 'react';

/**
 * ProtectedRoute Component
 * Wraps routes that require authentication.
 */
const ProtectedRoute = ({ children }) => {
    // const { isAuthenticated } = useAuth();
    // const location = useLocation();

    /*
    if (!isAuthenticated) {
        // Redirect to login if not authenticated, keeping the attempted location
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    */

    return children;
};

export default ProtectedRoute;
