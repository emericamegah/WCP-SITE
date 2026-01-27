import React, { useState, useEffect } from 'react';
import tenantService from '../../api/services/tenantService';
import RentSummaryCard from '../molecules/RentSummaryCard';
import MaintenanceTicket from '../molecules/MaintenanceTicket';
import DocumentRow from '../molecules/DocumentRow';
import { Home, AlertCircle, FileText, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TenantDashboardOverview = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await tenantService.getTenantData();
                setData(res.data);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch tenant data:', err);
                setError('Impossible de charger vos données. Veuillez réessayer plus tard.');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return (
        <div className="space-y-8 animate-pulse p-4">
            <div className="h-12 bg-gray-200 rounded-lg w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="h-48 bg-gray-200 rounded-xl"></div>
                        <div className="h-48 bg-gray-200 rounded-xl"></div>
                    </div>
                    <div className="h-64 bg-gray-200 rounded-xl"></div>
                </div>
                <div className="h-96 bg-gray-200 rounded-xl"></div>
            </div>
        </div>
    );

    if (error) return (
        <div className="p-12 text-center bg-white rounded-2xl border border-red-100 shadow-sm">
            <AlertCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">{error}</h3>
            <p className="text-gray-500 mb-6 italic">Erreur technique lors de la communication avec l'API.</p>
            <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-wcp-blue-600 text-white font-bold rounded-xl hover:bg-wcp-blue-700 transition-colors shadow-lg shadow-wcp-blue-100"
            >
                Réessayer la connexion
            </button>
        </div>
    );

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <section>
                <h3 className="text-2xl font-bold text-gray-900">Bonjour, {data.profile.firstName} 👋</h3>
                <p className="text-gray-500 mt-1 flex items-center">
                    <Home size={16} className="mr-2" />
                    {data.profile.property.address}
                </p>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Financial & Notifications */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Financial Overview */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <RentSummaryCard
                            rentAmount={data.lease.rentAmount}
                            charges={data.lease.charges}
                            dueDate="2025-02-05"
                            status="pending"
                        />

                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
                            <div>
                                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider flex items-center">
                                    <AlertCircle size={16} className="mr-2 text-wcp-blue-600" />
                                    Note de l'agence
                                </h4>
                                <p className="text-sm text-gray-700 mt-4 leading-relaxed">
                                    "L'entretien annuel de la chaudière est programmé pour le 15 février. Un technicien passera entre 14h et 16h."
                                </p>
                            </div>
                            <p className="text-xs text-gray-400 mt-4 italic">Posté il y a 2 jours</p>
                        </div>
                    </div>

                    {/* Recent Maintenance */}
                    <section>
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-lg font-bold text-gray-900 border-l-4 border-wcp-blue-600 pl-3">Dernières demandes</h4>
                            <Link to="/tenant/maintenance" className="text-sm text-wcp-blue-600 hover:underline flex items-center">
                                Voir tout <ChevronRight size={16} />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {data.maintenance.slice(0, 2).map((ticket) => (
                                <MaintenanceTicket key={ticket.id} {...ticket} />
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column - Recent Documents */}
                <div className="space-y-8">
                    <section>
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-lg font-bold text-gray-900 border-l-4 border-wcp-blue-600 pl-3">Derniers documents</h4>
                            <Link to="/tenant/documents" className="text-sm text-wcp-blue-600 hover:underline">
                                Historique
                            </Link>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
                            {data.receipts.slice(0, 4).map((receipt) => (
                                <DocumentRow
                                    key={receipt.id}
                                    name={receipt.month}
                                    date={receipt.date}
                                    type="pdf"
                                    onDownload={() => console.log(`API Call (Simulated): Downloading ${receipt.file}`)}
                                />
                            ))}
                        </div>
                        <button className="w-full mt-4 flex items-center justify-center p-4 bg-slate-50 border border-dashed border-gray-200 rounded-xl text-gray-500 hover:bg-slate-100 transition-colors text-sm font-medium group">
                            <FileText size={18} className="mr-2 group-hover:scale-110 transition-transform" />
                            Accéder au contrat de bail
                        </button>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TenantDashboardOverview;
