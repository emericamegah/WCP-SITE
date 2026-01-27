import React from 'react';
import PropTypes from 'prop-types';
import { Info } from 'lucide-react';

const PaymentSummaryCard = ({ title, amount, date, className = '' }) => {
    const formattedAmount = amount.toLocaleString('fr-FR');

    return (
        <div className={`bg-slate-900 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden ${className}`}>
            {/* Decorative Blur */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-wcp-blue-600/20 rounded-full blur-3xl"></div>

            <div className="relative z-10">
                <div className="flex items-center space-x-2 text-wcp-blue-400 mb-6">
                    <Info size={18} />
                    <span className="text-sm font-bold uppercase tracking-widest">Récapitulatif du paiement</span>
                </div>

                <h3 className="text-xl font-medium text-slate-300">{title}</h3>
                <div className="mt-4 flex items-baseline space-x-2">
                    <span className="text-4xl font-bold tracking-tight">{formattedAmount}</span>
                    <span className="text-xl font-medium text-slate-400">FCFA</span>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center text-sm">
                    <span className="text-slate-400">Date d'échéance</span>
                    <span className="font-bold">{date}</span>
                </div>
            </div>
        </div>
    );
};

PaymentSummaryCard.propTypes = {
    title: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default PaymentSummaryCard;
