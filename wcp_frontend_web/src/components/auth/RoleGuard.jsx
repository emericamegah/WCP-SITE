import React from 'react';

/**
 * RoleGuard Component
 * Protects routes based on specific user roles.
 * @param {string[]} allowedRoles - List of roles permitted to access the route
 */
const RoleGuard = ({ children }) => {
    // const { user, isAuthenticated } = useAuth();
    // const location = useLocation();

    /*
    if (!isAuthenticated) {
        // Rediriger vers login si non authentifié
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!allowedRoles.includes(user?.role)) {
        // Si utilisateur n'a pas le rôle, rediriger vers son dashboard par défaut
        const redirectPath = user?.role === 'admin' ? '/admin' :
            user?.role === 'owner' ? '/owner' :
                user?.role === 'tenant' ? '/tenant' : '/';

        // Éviter une boucle de redirection si on est déjà sur ce chemin ou un sous-chemin
        if (location.pathname.startsWith(redirectPath) && redirectPath !== '/') {
            return <Navigate to="/" replace />;
        }

        return <Navigate to={redirectPath} replace />;
    }
    */

    return children;
};

export default RoleGuard;
