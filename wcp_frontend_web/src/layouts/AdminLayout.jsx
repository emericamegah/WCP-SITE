import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Icon from '../components/atoms/Icon';
import { Button } from '../components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';

const navItems = [
    { icon: 'LayoutDashboard', label: 'Vue Globale', to: '/admin' },
    { icon: 'Users', label: 'Utilisateurs', to: '/admin/users' },
    { icon: 'Building', label: 'Registre Biens', to: '/admin/properties' },
    { icon: 'UserCheck', label: 'Assignements', to: '/admin/assignments' },
    { icon: 'LineChart', label: 'Finances & Rapports', to: '/admin/finance' },
    { icon: 'FileText', label: 'CMS', to: '/admin/cms' },
];

const AdminLayout = () => {
    const location = useLocation();
    const { logout } = useAuth(); // Assuming useAuth provides logout

    return (
        <div className="flex h-screen bg-slate-100 dark:bg-slate-900">
            {/* Admin Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex flex-shrink-0">
                <Link
                    to="/"
                    className="h-16 flex items-center px-6 border-b border-slate-800 hover:bg-slate-800/50 transition-colors group"
                    title="Retour à l'accueil"
                >
                    <span className="text-xl font-bold tracking-tight">WCP <span className="text-blue-500 group-hover:scale-110 inline-block transition-transform">Admin</span></span>
                </Link>

                <nav className="flex-1 py-6 px-3 space-y-1">
                    {navItems.map((item) => {
                        // Exact match for root, startsWith for others to handle sub-sections if any, 
                        // but strictly simple here:
                        const isActive = location.pathname === item.to || (item.to !== '/admin' && location.pathname.startsWith(item.to));

                        return (
                            <Link
                                key={item.to}
                                to={item.to}
                                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                    }`}
                            >
                                <Icon name={item.icon} className="mr-3 h-5 w-5 flex-shrink-0" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <div className="flex items-center gap-3 mb-4">
                        <Avatar className="h-9 w-9 border border-slate-700">
                            <AvatarFallback>A</AvatarFallback>
                        </Avatar>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium text-white truncate">Administrateur</p>
                            <p className="text-xs text-slate-500 truncate">admin@wcp.com</p>
                        </div>
                    </div>
                    <Button
                        variant="destructive"
                        className="w-full justify-start"
                        onClick={logout}
                    >
                        <Icon name="LogOut" className="mr-2 h-4 w-4" />
                        Déconnexion
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {/* Mobile Header (Placeholder) */}
                <div className="md:hidden h-16 bg-slate-900 text-white flex items-center px-4">
                    <span className="font-bold">WCP Admin</span>
                </div>

                <div className="p-8 max-w-7xl mx-auto space-y-8">
                    <Outlet />
                </div>
            </main>

            {/* Activity Monitor (Right Sidebar - Simplified for now) */}
            <aside className="w-80 bg-white border-l hidden xl:flex flex-col">
                <div className="p-4 border-b font-semibold text-sm">Activité en temps réel</div>
                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="flex gap-3 text-sm">
                            <div className="h-2 w-2 mt-1.5 rounded-full bg-blue-500 shrink-0" />
                            <div>
                                <p className="font-medium text-slate-900">Nouvelle connexion</p>
                                <p className="text-slate-500">Jean Michel s'est connecté.</p>
                                <p className="text-xs text-slate-400 mt-1">Il y a {i * 5} min</p>
                            </div>
                        </div>
                    ))}
                </div>
            </aside>
        </div>
    );
};

export default AdminLayout;
