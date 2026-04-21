import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Download, Home, ArrowRight } from 'lucide-react';
import WCPButton from '../components/atoms/WCPButton';

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const [transactionId] = useState(() => Math.random().toString(36).substr(2, 9).toUpperCase());

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-xl w-full">
                <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden text-center p-10 md:p-16 border border-gray-50">
                    <div className="mb-8 flex justify-center">
                        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center border-4 border-green-500 animate-in zoom-in duration-500">
                            <CheckCircle2 size={56} className="text-green-500" />
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Paiement validé !</h1>
                    <p className="text-gray-500 text-lg leading-relaxed mb-12">
                        Votre paiement de <span className="font-bold text-gray-900">150 000 FCFA</span> a été processé avec succès. Votre quittance sera disponible dans quelques instants.
                    </p>

                    <div className="space-y-4">
                        <WCPButton
                            variant="outline"
                            disabled
                            className="w-full py-4 text-gray-400 border-gray-200 cursor-not-allowed flex items-center justify-center"
                        >
                            <Download size={20} className="mr-2" />
                            Télécharger le reçu (Bientôt)
                        </WCPButton>

                        <WCPButton
                            onClick={() => navigate('/tenant')}
                            className="w-full py-4 bg-wcp-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-wcp-blue-100 flex items-center justify-center group transition-all"
                        >
                            <Home size={20} className="mr-2" />
                            Retour au Dashboard
                            <ArrowRight size={18} className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </WCPButton>
                    </div>

                    <div className="mt-12 pt-10 border-t border-gray-50">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Transaction ID</p>
                        <p className="text-sm font-mono text-gray-500 mt-1">WCP-TX-{transactionId}</p>
                    </div>
                </div>

                <p className="mt-8 text-center text-gray-400 text-sm italic leading-relaxed">
                    Merci de faire confiance à West Coast Property pour votre gestion immobilière.
                </p>
            </div>
        </div>
    );
};

export default PaymentSuccess;
