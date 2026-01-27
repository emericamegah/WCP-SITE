import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Send } from 'lucide-react';
import WCPButton from '../atoms/WCPButton';
import WCPInput from '../atoms/WCPInput';
import DatePickerAtome from '../atoms/DatePickerAtome';
import Icon from '../atoms/Icon';
import { navigateToRequestSubmission } from '../../utils/submissionNavigator';

const BookingWidget = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({ name: '', email: '', date: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Booking Request:', formData);
        // Submit logic
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sticky top-24">
            <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Intéressé par ce bien ?</h3>
                <p className="text-sm text-gray-500 mt-1">Réservez une visite ou posez vos questions.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <WCPInput
                    placeholder="Votre Nom"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                />
                <WCPInput
                    type="email"
                    placeholder="Votre Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
                <DatePickerAtome
                    label="Date souhaitée (optionnel)"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    minDate={new Date().toISOString().split('T')[0]}
                />

                <WCPButton type="submit" variant="primary" className="w-full justify-center py-3">
                    Demander une visite
                </WCPButton>

                <button
                    onClick={() => navigateToRequestSubmission(navigate, id)}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-200 mt-3"
                >
                    <Send size={18} />
                    Postuler pour ce bien
                </button>
            </form>

            <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                <button className="text-wcp-blue-600 font-medium hover:underline text-sm flex items-center justify-center gap-2 mx-auto">
                    <Icon name="Info" size={16} /> Demander plus d'informations
                </button>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-gray-500 text-xs">
                <Icon name="ShieldCheck" size={14} /> Données sécurisées et confidentielles
            </div>
        </div>
    );
};

export default BookingWidget;
