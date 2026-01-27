import React from 'react';
import PropertySubmissionForm from './PropertySubmissionForm';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OwnerPropertySubmission = () => {
    const navigate = useNavigate();

    const handleSubmit = (data) => {
        console.log('Property submitted:', data);
        alert('Bien soumis avec succès ! Notre équipe va l\'examiner et vous contacter dans les 48h.');
        navigate('/owner/properties');
    };

    return (
        <div className="space-y-6">
            {/* Header with Back Button */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/owner/properties')}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
                <div>
                    <h2 className="text-3xl font-bold text-[#111827]">
                        Ajouter un Nouveau Bien
                    </h2>
                    <p className="text-gray-600 mt-1">
                        Soumettez un bien à notre agence pour évaluation et gestion
                    </p>
                </div>
            </div>

            {/* Info Banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-semibold text-[#1E3A8A] mb-2">
                    Comment ça marche ?
                </h3>
                <ul className="space-y-2 text-sm text-blue-900">
                    <li>• Remplissez le formulaire avec les détails de votre bien</li>
                    <li>• Notre équipe évalue votre bien sous 48h</li>
                    <li>• Nous vous proposons un contrat de gestion adapté</li>
                    <li>• Une fois validé, votre bien est mis en location sur nos plateformes</li>
                </ul>
            </div>

            {/* Reuse existing PropertySubmissionForm */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-8">
                <PropertySubmissionForm
                    onSubmit={handleSubmit}
                    onCancel={() => navigate('/owner/properties')}
                />
            </div>
        </div>
    );
};

export default OwnerPropertySubmission;
