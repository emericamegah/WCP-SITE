import React from 'react';
import PropTypes from 'prop-types';
import { Loader2 } from 'lucide-react';

const PaymentLoadingModal = ({ isOpen, message = "Veuillez confirmer la transaction sur votre téléphone..." }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>

            {/* Content */}
            <div className="relative bg-white rounded-3xl p-10 shadow-2xl max-w-sm w-full text-center">
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-wcp-blue-50 rounded-full flex items-center justify-center mb-6">
                        <Loader2 className="text-wcp-blue-600 animate-spin" size={40} />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4">Paiement en cours</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                        {message}
                    </p>

                    <div className="mt-8 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-wcp-blue-600 h-full w-1/3 animate-progress transition-all duration-500 rounded-full"></div>
                    </div>

                    <p className="mt-4 text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                        Ne fermez pas cette fenêtre
                    </p>
                </div>
            </div>
        </div>
    );
};

PaymentLoadingModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    message: PropTypes.string,
};

export default PaymentLoadingModal;
