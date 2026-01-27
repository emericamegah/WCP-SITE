import React from 'react';
import PropTypes from 'prop-types';
import { CreditCard } from 'lucide-react';

const PaymentMethodIcon = ({ type, className = '' }) => {
    // Mobile Money MTN
    if (type === 'mtn') {
        return (
            <div className={`flex items-center justify-center bg-yellow-400 rounded-md px-2 py-1 font-bold text-black text-xs ${className}`}>
                MTN
            </div>
        );
    }

    // Mobile Money Moov
    if (type === 'moov') {
        return (
            <div className={`flex items-center justify-center bg-blue-600 rounded-md px-2 py-1 font-bold text-white text-xs ${className}`}>
                MOOV
            </div>
        );
    }

    // Visa
    if (type === 'visa') {
        return (
            <div className={`flex items-center justify-center font-bold italic text-blue-800 text-lg ${className}`}>
                VISA
            </div>
        );
    }

    // Mastercard
    if (type === 'mastercard') {
        return (
            <div className={`flex items-center space-x-[-10px] ${className}`}>
                <div className="w-6 h-6 rounded-full bg-red-500 opacity-80"></div>
                <div className="w-6 h-6 rounded-full bg-yellow-500 opacity-80"></div>
            </div>
        );
    }

    return <CreditCard className={className} />;
};

PaymentMethodIcon.propTypes = {
    type: PropTypes.oneOf(['mtn', 'moov', 'visa', 'mastercard', 'generic']),
    className: PropTypes.string,
};

export default PaymentMethodIcon;
