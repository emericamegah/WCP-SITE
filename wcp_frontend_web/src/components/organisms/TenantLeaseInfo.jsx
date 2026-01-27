import React, { useState, useEffect } from 'react';
import tenantService from '../../api/tenantService';
import { Info, Calendar, ShieldCheck, CreditCard } from 'lucide-react';

const TenantLeaseInfo = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        tenantService.getTenantData().then(res => {
            setData(res.data);
            setLoading(false);
        });
    }, []);

    if (loading) return <div className="text-center py-12">Chargement...</div>;

    const formatDate = (date) => new Date(date).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="space-y-8">
            <section>
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Info size={24} className="mr-3 text-wcp-blue-600" />
                    Détails de votre Bail
                </h3>
                <p className="text-gray-500 mt-1">Retrouvez les conditions principales de votre contrat de location.</p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Key Terms */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-wcp-blue-100 text-wcp-blue-600 rounded-lg">
                            <Calendar size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Durée du bail</p>
                            <p className="text-lg font-bold text-gray-900 mt-1">24 mois</p>
                        </div>
                    </div>
                    <div className="space-y-2 border-t border-gray-50 pt-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Début</span>
                            <span className="font-semibold text-gray-900">{formatDate(data.lease.startDate)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Fine prévue</span>
                            <span className="font-semibold text-gray-900">{formatDate(data.lease.endDate)}</span>
                        </div>
                    </div>
                </div>

                {/* Financial info */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                            <CreditCard size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Conditions financières</p>
                            <p className="text-lg font-bold text-gray-900 mt-1">Loyer mensuel</p>
                        </div>
                    </div>
                    <div className="space-y-2 border-t border-gray-50 pt-4">
                        <div className="flex justify-between text-sm text-gray-900 font-bold mb-4">
                            <span>Mensualité Totale</span>
                            <span>{(data.lease.rentAmount + data.lease.charges).toLocaleString()} FCFA</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Dépôt de garantie</span>
                            <span className="font-semibold text-gray-900">{data.lease.deposit.toLocaleString()} FCFA</span>
                        </div>
                    </div>
                </div>

                {/* Assurance / Legal */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
                            <ShieldCheck size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Assurance Habitation</p>
                            <p className="text-lg font-bold text-gray-900 mt-1 underline decoration-orange-200">À jour</p>
                        </div>
                    </div>
                    <div className="text-sm border-t border-gray-50 pt-4 leading-relaxed text-gray-600">
                        Votre certificat d'assurance a été validé le 05 Janvier 2025. Prochaine échéance : Fin 2025.
                    </div>
                </div>
            </div>

            {/* Property Recap Section */}
            <section className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div>
                        <h4 className="text-xl font-bold mb-2">Récapitulatif de l'Objectif</h4>
                        <p className="text-slate-400 max-w-xl leading-relaxed">
                            En louant via West Coast Property, vous bénéficiez d'un suivi personnalisé et d'une gestion transparente de votre habitat.
                        </p>
                    </div>
                    <button className="px-6 py-3 bg-wcp-blue-600 hover:bg-wcp-blue-700 rounded-xl font-bold transition-colors whitespace-nowrap">
                        Demander une Rénovation
                    </button>
                </div>
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-wcp-blue-600/10 rounded-full blur-3xl"></div>
            </section>
        </div>
    );
};

export default TenantLeaseInfo;
