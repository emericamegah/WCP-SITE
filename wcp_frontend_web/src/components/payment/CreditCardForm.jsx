import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PaymentMethodIcon from './PaymentMethodIcon';
import WCPButton from '../atoms/WCPButton';
import { User, CreditCard, Calendar, Lock } from 'lucide-react';

const CreditCardForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        cardName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ method: 'card', ...formData });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider pl-1">Nom sur la carte</label>
                <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                    <input
                        name="cardName"
                        type="text"
                        required
                        placeholder="KOFFI N'GORAN"
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-wcp-blue-100 focus:border-wcp-blue-600 outline-none transition-all text-gray-900 font-medium placeholder:text-gray-300"
                        value={formData.cardName}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider pl-1 font-mono">Numéro de carte</label>
                <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex space-x-2">
                        <PaymentMethodIcon type="visa" className="opacity-50" />
                        <PaymentMethodIcon type="mastercard" className="opacity-50 scale-75" />
                    </div>
                    <input
                        name="cardNumber"
                        type="text"
                        required
                        placeholder="0000 0000 0000 0000"
                        className="w-full pl-12 pr-28 py-4 bg-slate-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-wcp-blue-100 focus:border-wcp-blue-600 outline-none transition-all text-gray-900 font-mono tracking-widest placeholder:text-gray-300"
                        value={formData.cardNumber}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider pl-1">Date d'expiration</label>
                    <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                        <input
                            name="expiryDate"
                            type="text"
                            required
                            placeholder="MM/YY"
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-wcp-blue-100 focus:border-wcp-blue-600 outline-none transition-all text-gray-900 font-medium placeholder:text-gray-300"
                            value={formData.expiryDate}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider pl-1">Cryptogramme (CVV)</label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                        <input
                            name="cvv"
                            type="password"
                            maxLength="3"
                            required
                            placeholder="000"
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-wcp-blue-100 focus:border-wcp-blue-600 outline-none transition-all text-gray-900 font-medium placeholder:text-gray-300"
                            value={formData.cvv}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>

            <WCPButton
                type="submit"
                className="w-full py-5 text-lg font-bold shadow-xl shadow-wcp-blue-100 rounded-2xl"
            >
                Confirmer le paiement
            </WCPButton>

            <p className="text-center text-[10px] text-gray-400 text-balance px-4 uppercase tracking-tighter">
                Vos données bancaires sont traitées de manière sécurisée et ne sont jamais stockées sur nos serveurs par nos partenaires de confiance.
            </p>
        </form>
    );
};

CreditCardForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default CreditCardForm;
