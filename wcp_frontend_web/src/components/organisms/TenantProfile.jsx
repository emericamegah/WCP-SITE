import React from 'react';
import { User, Mail, Shield, AlertCircle } from 'lucide-react';

const TenantProfilePlaceholder = () => {
    return (
        <div className="space-y-8">
            <section>
                <h3 className="text-2xl font-bold text-gray-900">Mon Profil</h3>
                <p className="text-gray-500 mt-1">Gérez vos informations personnelles et votre sécurité.</p>
            </section>

            <div className="max-w-2xl bg-white p-8 rounded-xl border border-gray-100 shadow-sm space-y-8">
                <div className="flex items-center space-x-6 pb-8 border-b border-gray-50">
                    <div className="w-24 h-24 bg-wcp-blue-100 rounded-full flex items-center justify-center text-wcp-blue-600 text-3xl font-bold border-4 border-wcp-blue-50">
                        KN
                    </div>
                    <div>
                        <h4 className="text-2xl font-bold text-gray-900">Koffi N'Goran</h4>
                        <p className="text-gray-500">Membre Premium Locataire</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email</label>
                            <div className="flex items-center text-gray-900 font-medium">
                                <Mail size={16} className="mr-2 text-gray-400" />
                                koffi.ngoran@example.com
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Compte</label>
                            <div className="flex items-center text-gray-900 font-medium">
                                <Shield size={16} className="mr-2 text-green-500" />
                                Vérifié
                            </div>
                        </div>
                    </div>

                    <button className="px-6 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors">
                        Changer le mot de passe
                    </button>
                </div>

                <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl flex items-start space-x-3">
                    <AlertCircle size={20} className="text-orange-500 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-orange-700 leading-relaxed">
                        Pour toute modification d'adresse email ou d'identité, veuillez contacter votre agent West Coast Property dédié.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TenantProfilePlaceholder;
