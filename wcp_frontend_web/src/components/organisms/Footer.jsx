import React from 'react';
import { Link } from 'react-router-dom';
import WCPButton from '../atoms/WCPButton';
import Icon from '../atoms/Icon';

const Footer = () => {
    return (
        <footer className="bg-wcp-dark text-white pt-16 pb-8 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand Column */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <Icon name="Building2" className="text-wcp-blue-500" size={32} />
                            <span className="text-2xl font-bold tracking-wider">WCP</span>
                        </div>
                        <p className="text-gray-400 leading-relaxed max-w-sm">
                            Votre partenaire de confiance pour tous vos projets immobiliers sur la côte Ouest. Excellence, transparence et proximité sont nos maîtres mots.
                        </p>
                    </div>

                    {/* Links Column */}
                    <div>
                        <h5 className="text-lg font-bold mb-6 border-b border-gray-700 pb-2 inline-block">Liens Utiles</h5>
                        <ul className="space-y-3 text-gray-400">
                            <li><a href="#" className="hover:text-wcp-blue-500 transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 bg-wcp-blue-600 rounded-full"></div> Mentions Légales</a></li>
                            <li><a href="#" className="hover:text-wcp-blue-500 transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 bg-wcp-blue-600 rounded-full"></div> Politique de Confidentialité</a></li>
                            <li><a href="#" className="hover:text-wcp-blue-500 transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 bg-wcp-blue-600 rounded-full"></div> Nos Honoraires</a></li>
                            <li><a href="#" className="hover:text-wcp-blue-500 transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 bg-wcp-blue-600 rounded-full"></div> Recrutement</a></li>
                            <li>
                                <Link
                                    to="/apporter-des-affaires"
                                    className="hover:text-wcp-blue-500 transition-colors flex items-center gap-2"
                                >
                                    <div className="w-1.5 h-1.5 bg-wcp-blue-600 rounded-full"></div>
                                    Devenir Apporteur d'Affaires
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div>
                        <h5 className="text-lg font-bold mb-6 border-b border-gray-700 pb-2 inline-block">Newsletter</h5>
                        <p className="text-gray-400 mb-4">Restez informé des dernières opportunités avant tout le monde.</p>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                className="flex-1 bg-gray-800 border-gray-700 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-wcp-blue-500 focus:outline-none placeholder-gray-500"
                                placeholder="Votre email"
                            />
                            <WCPButton variant="primary">S'abonner</WCPButton>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} West Coast Property. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
