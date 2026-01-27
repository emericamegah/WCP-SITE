import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PaymentMethodIcon from './PaymentMethodIcon';
import WCPButton from '../atoms/WCPButton';
import { Phone, ChevronDown } from 'lucide-react';

const MobileMoneyForm = ({ onSubmit }) => {
    const [operator, setOperator] = useState('mtn');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ method: 'mobile_money', operator, phoneNumber });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <button
                    type="button"
                    onClick={() => setOperator('mtn')}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${operator === 'mtn' ? 'border-yellow-400 bg-yellow-50 shadow-sm' : 'border-gray-100 hover:border-gray-200'}`}
                >
                    <PaymentMethodIcon type="mtn" size={32} />
                    <span className="text-xs font-bold mt-2 text-gray-600">MTN Money</span>
                </button>

                <button
                    type="button"
                    onClick={() => setOperator('moov')}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${operator === 'moov' ? 'border-blue-600 bg-blue-50 shadow-sm' : 'border-gray-100 hover:border-gray-200'}`}
                >
                    <PaymentMethodIcon type="moov" size={32} />
                    <span className="text-xs font-bold mt-2 text-gray-600">Moov Money</span>
                </button>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider pl-1">Numéro de téléphone</label>
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center space-x-2 border-r border-gray-200 pr-3 pointer-events-none group-focus-within:border-wcp-blue-300">
                        <span className="font-bold text-gray-400">+225</span>
                    </div>
                    <input
                        type="tel"
                        required
                        pattern="[0-9]*"
                        placeholder="07 00 00 00 00"
                        className="w-full pl-20 pr-4 py-4 bg-slate-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-wcp-blue-100 focus:border-wcp-blue-600 outline-none transition-all text-gray-900 font-medium placeholder:text-gray-300"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                <p className="text-[10px] text-gray-400 mt-2 px-1">Un code de confirmation vous sera envoyé par SMS par votre opérateur.</p>
            </div>

            <WCPButton
                type="submit"
                className="w-full py-5 text-lg font-bold shadow-xl shadow-wcp-blue-100 rounded-2xl"
            >
                Payer maintenant
            </WCPButton>
        </form>
    );
};

MobileMoneyForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default MobileMoneyForm;
