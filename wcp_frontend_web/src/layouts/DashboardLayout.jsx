import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from '../components/organisms/Sidebar';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';

const DashboardLayout = () => {
    const { isAuthenticated, login } = useAuth();

    // Simple auto-login for demo purposes if not authenticated
    // In a real app, this would redirect to /login
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <h2 className="text-xl font-bold mb-4">Accès Restreint</h2>
                    <p className="mb-4 text-gray-600">Veuillez vous authentifier pour accéder au dashboard.</p>
                    <Button onClick={() => login('admin@wcp.fr', 'admin')}>
                        Simuler Connexion Admin
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex bg-gray-50 min-h-screen font-sans">
            <Sidebar className="hidden md:flex sticky top-0 h-screen" />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
