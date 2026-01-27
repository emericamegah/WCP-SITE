import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import * as Lucide from 'lucide-react';
import { apporteurProfile } from '../api/apporteurMockData';
import { useAuth } from '../contexts/AuthContext';

const SafeIcon = ({ name, ...props }) => {
    const Icon = Lucide[name] || Lucide.HelpCircle;
    return <Icon {...props} />;
};

const ApporteurLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const navItems = [
        { path: '/apporteur', label: 'Espace Partenaire', icon: 'LayoutDashboard', exact: true },
        { path: '/apporteur/submit-client', label: 'Apporter un Client', icon: 'UserPlus' },
        { path: '/apporteur/submit-property', label: 'Apporter un Bien', icon: 'Home' },
        { path: '/apporteur/commissions', label: 'Mes Commissions', icon: 'Wallet' },
        { path: '/apporteur/profile', label: 'Mon Compte (RIB)', icon: 'ShieldCheck' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 bg-slate-900 w-64 border-r border-slate-800 z-50 transform transition-all duration-300
                lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <button
                    onClick={() => navigate('/')}
                    className="h-20 w-full flex items-center px-6 border-b border-slate-800 hover:bg-slate-800/50 transition-colors group"
                    title="Retour à l'accueil"
                >
                    <Lucide.Building2 className="text-blue-500 mr-3 group-hover:scale-110 transition-transform" size={24} />
                    <span className="text-xl font-bold text-white tracking-tight">WCP Partenaire</span>
                </button>

                <div className="p-6">
                    <div className="flex items-center gap-3 mb-8 px-2">
                        <img
                            src={apporteurProfile.avatar}
                            alt={apporteurProfile.name}
                            className="w-10 h-10 rounded-full border-2 border-blue-500"
                        />
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold text-white truncate">{apporteurProfile.name}</p>
                            <p className="text-[10px] text-slate-400 uppercase font-black">Apporteur d'affaires</p>
                        </div>
                    </div>

                    <nav className="space-y-2">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.exact}
                                onClick={() => setIsSidebarOpen(false)}
                                className={({ isActive }) => `
                                    flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all
                                    ${isActive
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
                                `}
                            >
                                <SafeIcon name={item.icon} size={20} />
                                <span>{item.label}</span>
                            </NavLink>
                        ))}
                    </nav>
                </div>

                <div className="absolute bottom-0 w-full p-6 border-t border-slate-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl text-sm font-bold text-slate-400 hover:bg-red-900/20 hover:text-red-500 transition-all group"
                    >
                        <Lucide.LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Déconnexion</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-30 shadow-sm sm:px-8">
                    <div className="flex items-center">
                        <button
                            className="lg:hidden p-2 -ml-2 text-slate-900 hover:bg-slate-50 rounded-xl transition-all"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Lucide.Menu size={24} />
                        </button>
                        <div className="hidden lg:block">
                            <h2 className="text-lg font-bold text-slate-900">Bienvenue sur votre portail partenaire</h2>
                            <p className="text-xs text-slate-500">Suivez vos apports et gérez vos commissions en toute simplicité.</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="hidden sm:flex flex-col items-end px-4 py-2 bg-slate-50 rounded-lg">
                            <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">En attente</p>
                            <p className="text-sm font-bold text-blue-600">{apporteurProfile.pendingCommissions.toLocaleString()} FCFA</p>
                        </div>
                        <button className="p-2 text-slate-400 hover:text-slate-900 transition-all relative bg-slate-50 rounded-full">
                            <Lucide.Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                    </div>
                </header>

                {/* Content Layout */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8 lg:p-10">
                    <div className="max-w-6xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ApporteurLayout;
