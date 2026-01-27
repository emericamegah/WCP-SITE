import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('wcp_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const navigate = useNavigate();

    const login = (email, password, role) => {
        // Mock login based on credentials and role selection
        if (!email || !password) return false;

        const roleLabels = {
            admin: 'Administrateur',
            owner: 'Propriétaire',
            tenant: 'Locataire',
            apporteur: 'Apporteur d\'Affaires',
            agent: 'Chargé d\'Affaires'
        };

        const mockUser = {
            name: `${roleLabels[role] || 'Utilisateur'} WCP`,
            email,
            role: role || 'tenant', // Fallback to tenant if role is missing
            avatar: `https://i.pravatar.cc/150?u=${role || 'tenant'}`
        };

        setUser(mockUser);
        localStorage.setItem('wcp_user', JSON.stringify(mockUser));
        localStorage.setItem('wcp_jwt_token', 'mock-jwt-token');
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('wcp_user');
        localStorage.removeItem('wcp_jwt_token');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, role: user?.role }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
