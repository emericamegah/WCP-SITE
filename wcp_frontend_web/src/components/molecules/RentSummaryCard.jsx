import React from 'react';
import PropTypes from 'prop-types';
import StatusBadge from '../atoms/StatusBadge';
import WCPButton from '../atoms/WCPButton';
import { CreditCard } from 'lucide-react';

const RentSummaryCard = ({ rentAmount, charges, dueDate, status, className = '' }) => {
    const total = rentAmount + charges;
    const formattedTotal = total.toLocaleString('fr-FR');
    const formattedDueDate = new Date(dueDate).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className={`bg-white p-6 rounded-xl border border-gray-100 shadow-sm ${className}`}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-sm font-medium text-gray-500">Loyer du mois</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{formattedTotal} FCFA</h3>
                </div>
                <StatusBadge status={status} />
            </div>

            <div className="space-y-2 border-t border-gray-50 pt-4">
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Loyer nu</span>
                    <span>{rentAmount.toLocaleString('fr-FR')} FCFA</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Charges</span>
                    <span>{charges.toLocaleString('fr-FR')} FCFA</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-gray-900 border-t border-gray-50 pt-2 mt-2">
                    <span>Date d'échéance</span>
                    <span>{formattedDueDate}</span>
                </div>
            </div>

            {status === 'pending' && (
                <WCPButton
                    onClick={() => window.location.href = '/checkout'}
                    className="w-full mt-6 py-3 font-bold shadow-lg shadow-wcp-blue-100"
                >
                    <CreditCard size={18} className="mr-2" />
                    Procéder au paiement
                </WCPButton>
            )}
        </div>
    );
};

RentSummaryCard.propTypes = {
    rentAmount: PropTypes.number.isRequired,
    charges: PropTypes.number.isRequired,
    dueDate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default RentSummaryCard;
