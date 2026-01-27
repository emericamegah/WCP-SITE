import React from 'react';
import PropTypes from 'prop-types';
import { Smartphone, CreditCard, ChevronRight } from 'lucide-react';

const PaymentMethodCard = ({ id, title, description, icon: Icon, isSelected, onClick }) => {
    return (
        <button
            onClick={() => onClick(id)}
            className={`
        w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between
        ${isSelected
                    ? 'border-wcp-blue-600 bg-wcp-blue-50 shadow-md ring-1 ring-wcp-blue-600'
                    : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'}
      `}
        >
            <div className="flex items-center space-x-5">
                <div className={`
          w-14 h-14 rounded-xl flex items-center justify-center transition-colors
          ${isSelected ? 'bg-wcp-blue-600 text-white' : 'bg-gray-50 text-gray-500'}
        `}>
                    {Icon === 'mobile' ? <Smartphone size={28} /> : <CreditCard size={28} />}
                </div>
                <div>
                    <h4 className={`font-bold text-lg ${isSelected ? 'text-wcp-blue-600' : 'text-gray-900'}`}>
                        {title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-0.5">{description}</p>
                </div>
            </div>

            <div className={`
        w-8 h-8 rounded-full flex items-center justify-center transition-all
        ${isSelected ? 'bg-wcp-blue-600 text-white translate-x-1' : 'bg-gray-100 text-gray-400 opacity-0'}
      `}>
                <ChevronRight size={18} />
            </div>
        </button>
    );
};

PaymentMethodCard.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.oneOf(['mobile', 'card']).isRequired,
    isSelected: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default PaymentMethodCard;
