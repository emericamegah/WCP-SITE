import React, { useState, useEffect } from 'react';
import tenantService from '../../api/tenantService';
import DocumentRow from '../molecules/DocumentRow';
import { FileText, Search } from 'lucide-react';

const TenantDocuments = () => {
    const [receipts, setReceipts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        tenantService.getReceipts().then(res => {
            setReceipts(res.data);
            setLoading(false);
        });
    }, []);

    const filteredReceipts = receipts.filter(r =>
        r.month.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDownload = (file) => {
        console.log(`API Call (Simulated): Downloading ${file}`);
        alert(`Téléchargement de ${file} lancé.`);
    };

    if (loading) return <div className="text-center py-12">Chargement...</div>;

    return (
        <div className="space-y-8">
            <section>
                <h3 className="text-2xl font-bold text-gray-900">Gestion des Documents</h3>
                <p className="text-gray-500 mt-1">Accédez à votre contrat de bail et vos quittances mensuelles.</p>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Documents List */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-4 bg-slate-50 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <h4 className="font-bold text-gray-900">Historique des Paiements</h4>
                            <div className="relative">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Rechercher un mois..."
                                    className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-wcp-blue-500 focus:outline-none w-full sm:w-64"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="divide-y divide-gray-50">
                            {filteredReceipts.length > 0 ? (
                                filteredReceipts.map((receipt) => (
                                    <DocumentRow
                                        key={receipt.id}
                                        name={receipt.month}
                                        date={receipt.date}
                                        type="pdf"
                                        onDownload={() => handleDownload(receipt.file)}
                                    />
                                ))
                            ) : (
                                <div className="p-12 text-center text-gray-400">Aucun document ne correspond à votre recherche.</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Access Sidebar */}
                <div className="space-y-6">
                    <div className="bg-wcp-blue-600 rounded-xl p-6 text-white shadow-lg shadow-wcp-blue-100">
                        <h4 className="font-bold text-lg mb-4 flex items-center">
                            <FileText size={20} className="mr-2" />
                            Document Maître
                        </h4>
                        <div className="p-4 bg-white/10 rounded-lg border border-white/20">
                            <p className="text-sm font-semibold">Contrat de Bail</p>
                            <p className="text-xs text-white/70 mt-1">Signé le 01 Jan 2024</p>
                            <button
                                onClick={() => handleDownload('bail_contract_main.pdf')}
                                className="mt-4 w-full py-2 bg-white text-wcp-blue-600 rounded-lg text-sm font-bold hover:bg-wcp-blue-50 transition-colors"
                            >
                                Consulter le PDF
                            </button>
                        </div>
                        <p className="text-xs mt-6 text-white/60 leading-relaxed italic">
                            Ce document contient les termes officiels de votre location chez West Coast Property.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TenantDocuments;
