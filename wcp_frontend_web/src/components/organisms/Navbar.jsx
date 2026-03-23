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
        <nav className="glass sticky top-0 z-50 transition-all duration-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-2">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
                            <Icon name="Building2" className="text-wcp-blue-600 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" size={32} />
                            <span className="font-sans font-bold text-2xl tracking-widest text-wcp-dark-900 uppercase">WCP.</span>
                        </Link>
                    </div>

                    {/* Desktop Menu - Centered */}
                    <div className="hidden md:flex flex-1 items-center justify-center space-x-8">
                        <Link to="/" className="text-wcp-grey-700 hover:text-wcp-blue-600 font-semibold tracking-wide transition-colors">Accueil</Link>
                        <Link to="/services" className="text-wcp-grey-700 hover:text-wcp-blue-600 font-semibold tracking-wide transition-colors">Services</Link>
                        <Link to="/biens" className="text-wcp-grey-700 hover:text-wcp-blue-600 font-semibold tracking-wide transition-colors">Nos Biens</Link>
                        <Link to="/contact" className="text-wcp-grey-700 hover:text-wcp-blue-600 font-semibold tracking-wide transition-colors">Contact</Link>
                    </div>

                    {/* CTA Button - Right */}
                    <div className="hidden md:flex items-center">

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
                                className="rounded-lg px-6 py-2.5 bg-gradient-to-br from-wcp-blue-600 to-wcp-blue-500 text-white font-bold shadow-[0_10px_20px_rgba(34,69,97,0.2)] hover:scale-[1.02] transform transition-all border-none"
                            >
                                <Icon name="LayoutDashboard" className="mr-2" size={18} /> Mon Dashboard
                            </WCPButton>
                        ) : (
                            <WCPButton
                                onClick={() => navigate('/login')}
                                variant="primary"
                                className="rounded-lg px-6 py-2.5 bg-gradient-to-br from-wcp-blue-600 to-wcp-blue-500 text-white font-bold shadow-[0_10px_20px_rgba(34,69,97,0.2)] hover:scale-[1.02] transform transition-all border-none"
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
