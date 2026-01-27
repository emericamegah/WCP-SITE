import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import WCPButton from '../atoms/WCPButton';
import Icon from '../atoms/Icon';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
                            <Icon name="Building2" className="text-wcp-blue-600 transition-transform group-hover:scale-110" size={28} />
                            <span className="font-bold text-xl tracking-tight text-gray-900">WEST COAST PROPERTY</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-600 hover:text-wcp-blue-600 font-medium transition-colors">Accueil</Link>
                        <Link to="/services" className="text-gray-600 hover:text-wcp-blue-600 font-medium transition-colors">Services</Link>
                        <Link to="/biens" className="text-gray-600 hover:text-wcp-blue-600 font-medium transition-colors">Nos Biens</Link>
                        <Link to="/contact" className="text-gray-600 hover:text-wcp-blue-600 font-medium transition-colors">Contact</Link>

                        {isAuthenticated ? (
                            <WCPButton
                                onClick={() => {
                                    const redirectMap = {
                                        admin: '/admin',
                                        owner: '/owner',
                                        tenant: '/tenant',
                                        agent: '/dashboard',
                                        apporteur: '/apporteur'
                                    };
                                    navigate(redirectMap[user.role] || '/');
                                }}
                                variant="primary"
                                className="rounded-full px-6 shadow-md hover:shadow-lg transform active:scale-95 transition-all bg-slate-900 border-slate-900"
                            >
                                <Icon name="LayoutDashboard" className="mr-2" size={18} /> Mon Dashboard
                            </WCPButton>
                        ) : (
                            <WCPButton
                                onClick={() => navigate('/login')}
                                variant="primary"
                                className="rounded-full px-6 shadow-md hover:shadow-lg transform active:scale-95 transition-all"
                            >
                                <Icon name="UserCircle" className="mr-2" size={18} /> Espace Client
                            </WCPButton>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-wcp-blue-500"
                        >
                            <Icon name={isOpen ? "X" : "Menu"} size={24} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-wcp-blue-600 hover:bg-gray-50">Accueil</Link>
                        <Link to="/services" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-wcp-blue-600 hover:bg-gray-50">Services</Link>
                        <Link to="/biens" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-wcp-blue-600 hover:bg-gray-50">Nos Biens</Link>
                        <Link to="/rechercher-un-bien" className="block px-3 py-2 rounded-md text-base font-bold text-primary hover:bg-gray-50">Faire une demande</Link>
                        <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-wcp-blue-600 hover:bg-gray-50">Contact</Link>
                        <div className="pt-4 pb-2">
                            {isAuthenticated ? (
                                <WCPButton
                                    onClick={() => {
                                        const redirectMap = {
                                            admin: '/admin',
                                            owner: '/owner',
                                            tenant: '/tenant',
                                            agent: '/dashboard',
                                            apporteur: '/apporteur'
                                        };
                                        navigate(redirectMap[user.role] || '/');
                                        setIsOpen(false);
                                    }}
                                    variant="primary"
                                    className="w-full justify-center rounded-full bg-slate-900 border-slate-900"
                                >
                                    <Icon name="LayoutDashboard" className="mr-2" size={18} /> Mon Dashboard
                                </WCPButton>
                            ) : (
                                <WCPButton
                                    onClick={() => {
                                        navigate('/login');
                                        setIsOpen(false);
                                    }}
                                    variant="primary"
                                    className="w-full justify-center rounded-full"
                                >
                                    <Icon name="UserCircle" className="mr-2" size={18} /> Espace Client
                                </WCPButton>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
