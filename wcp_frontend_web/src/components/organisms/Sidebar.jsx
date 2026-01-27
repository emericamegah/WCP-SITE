import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '../atoms/Icon';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../lib/utils';

const Sidebar = ({ className }) => {
    const { user, logout } = useAuth();

    const navItems = [
        { icon: 'LayoutDashboard', label: 'Tableau de bord', to: '/dashboard' },
        { icon: 'FileCheck', label: 'Validations', to: '/dashboard/validations' },
        { icon: 'Home', label: 'Biens', to: '/dashboard/properties' },
        { icon: 'Users', label: 'Clients', to: '/dashboard/clients' },
        { icon: 'Wrench', label: 'Maintenance', to: '/dashboard/maintenance' },
        { icon: 'FileText', label: 'Contrats', to: '/dashboard/contracts' },
    ];

    return (
        <div className={cn("pb-12 min-h-screen w-64 bg-slate-900 text-white flex flex-col border-r border-slate-800", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-white flex items-center gap-2">
                        <Icon name="Building2" className="text-blue-500" />
                        WCP Manager
                    </h2>
                    <div className="space-y-1 mt-8">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end={item.to === '/dashboard'}
                                className={({ isActive }) => cn(
                                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-800 hover:text-white",
                                    isActive ? "bg-slate-800 text-white shadow-sm border-l-4 border-blue-500" : "text-slate-400"
                                )}
                            >
                                <Icon name={item.icon} size={18} />
                                {item.label}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-auto px-3 py-4 border-t border-slate-800">
                <div className="fex flex-col space-y-4">
                    {user && (
                        <div className="flex items-center gap-3 px-2 mb-4">
                            <Avatar>
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback>AD</AvatarFallback>
                            </Avatar>
                            <div className="overflow-hidden">
                                <p className="text-sm font-medium text-white truncate">{user.name}</p>
                                <p className="text-xs text-slate-400 truncate">{user.email}</p>
                            </div>
                        </div>
                    )}
                    <Button variant="destructive" className="w-full justify-start" onClick={logout}>
                        <Icon name="LogOut" size={16} className="mr-2" />
                        Déconnexion
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
