import React, { useState, useEffect } from 'react';
import tenantService from '../../api/tenantService';
import MaintenanceTicket from '../molecules/MaintenanceTicket';
import WCPButton from '../atoms/WCPButton';
import Toast from '../atoms/Toast';
import { Hammer, Send, Camera, History } from 'lucide-react';

const TenantMaintenance = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        tenantService.getMaintenanceTickets().then(res => {
            setTickets(res.data);
            setLoading(false);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        tenantService.submitMaintenanceTicket({ subject, description }).then(() => {
            setIsSubmitting(false);
            setShowToast(true);
            setSubject('');
            setDescription('');
        });
    };

    return (
        <div className="space-y-8">
            <section>
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Hammer size={24} className="mr-3 text-wcp-blue-600" />
                    Support & Maintenance
                </h3>
                <p className="text-gray-500 mt-1">Signalez un problème technique dans votre logement.</p>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Submission Form */}
                <section className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm h-fit">
                    <h4 className="text-lg font-bold text-gray-900 mb-6">Nouveau Signalement</h4>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Sujet du problème</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-3 bg-slate-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-wcp-blue-500 focus:outline-none transition-all"
                                placeholder="Ex: Fuite d'eau, Chauffage en panne..."
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Description détaillée</label>
                            <textarea
                                required
                                rows="4"
                                className="w-full px-4 py-3 bg-slate-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-wcp-blue-500 focus:outline-none transition-all"
                                placeholder="Expliquez le problème en quelques mots..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-dashed border-gray-200 cursor-pointer hover:bg-slate-100 transition-colors">
                            <div className="flex items-center text-sm text-gray-500">
                                <Camera size={20} className="mr-3" />
                                <span>Ajouter une photo (Simulé)</span>
                            </div>
                            <span className="text-xs font-bold text-wcp-blue-600 uppercase tracking-widest">Choisir</span>
                        </div>

                        <WCPButton
                            type="submit"
                            className="w-full py-4 text-base font-bold shadow-lg shadow-wcp-blue-100"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Envoi en cours...' : (
                                <span className="flex items-center">
                                    Envoyer le signalement <Send size={18} className="ml-2" />
                                </span>
                            )}
                        </WCPButton>
                    </form>
                </section>

                {/* History Section */}
                <section className="space-y-6">
                    <div className="flex items-center mb-6">
                        <History size={20} className="mr-2 text-gray-400" />
                        <h4 className="text-lg font-bold text-gray-900">Requêtes passées</h4>
                    </div>

                    <div className="space-y-6">
                        {loading ? (
                            <div className="text-center py-12 text-gray-400">Chargement de l'historique...</div>
                        ) : (
                            tickets.map((ticket) => (
                                <MaintenanceTicket key={ticket.id} {...ticket} />
                            ))
                        )}
                    </div>
                </section>
            </div>

            {showToast && (
                <Toast
                    message="Signalement envoyé avec succès ! Un technicien vous contactera bientôt."
                    onClose={() => setShowToast(false)}
                />
            )}
        </div>
    );
};

export default TenantMaintenance;
