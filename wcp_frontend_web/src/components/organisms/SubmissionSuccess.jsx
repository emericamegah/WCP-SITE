import React from 'react';
import PropTypes from 'prop-types';
import { CheckCircle, Home, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import FormButton from '../atoms/FormButton';

const SubmissionSuccess = ({
    trackingNumber,
    submissionType,
    onNewSubmission
}) => {
    const getMessage = () => {
        switch (submissionType) {
            case 'property':
                return {
                    title: 'Bien Soumis avec Succès !',
                    description: 'Votre bien a été enregistré dans notre système. Notre équipe va l\'examiner et vous contacter dans les 48h pour discuter de la suite.',
                };
            case 'request':
                return {
                    title: 'Demande Envoyée !',
                    description: 'Nous avons bien reçu votre demande de location/achat. Un conseiller va analyser vos critères et vous proposer des biens correspondants sous 24h.',
                };
            case 'referral':
                return {
                    title: 'Apport Enregistré !',
                    description: 'Votre apport a été soumis à notre service commercial. Un chargé d\'affaires va vérifier les informations et vous contacter sous 48h pour valider la collaboration.',
                };
            default:
                return {
                    title: 'Soumission Réussie !',
                    description: 'Merci pour votre soumission. Notre équipe reviendra vers vous très prochainement.',
                };
        }
    };

    const { title, description } = getMessage();

    return (
        <div className="flex flex-col items-center justify-center p-12 text-center min-h-[500px]">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-300">
                <CheckCircle size={48} />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-3">
                {title}
            </h2>

            <p className="text-gray-600 max-w-2xl mb-6 text-lg">
                {description}
            </p>

            {/* Tracking Number */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-8 max-w-md w-full">
                <p className="text-sm text-blue-700 mb-2 font-medium">
                    Numéro de suivi
                </p>
                <div className="flex items-center justify-center gap-2">
                    <FileText size={20} className="text-blue-600" />
                    <p className="text-2xl font-bold text-blue-900 font-mono">
                        {trackingNumber}
                    </p>
                </div>
                <p className="text-xs text-blue-600 mt-2">
                    Conservez ce numéro pour suivre votre demande
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/">
                    <FormButton variant="outline" icon={Home}>
                        Retour à l'accueil
                    </FormButton>
                </Link>
                {onNewSubmission && (
                    <FormButton
                        variant="primary"
                        onClick={onNewSubmission}
                    >
                        Nouvelle soumission
                    </FormButton>
                )}
            </div>
        </div>
    );
};

SubmissionSuccess.propTypes = {
    trackingNumber: PropTypes.string.isRequired,
    submissionType: PropTypes.oneOf(['property', 'request', 'referral']).isRequired,
    onNewSubmission: PropTypes.func,
};

export default SubmissionSuccess;
