import React from 'react';
import PropTypes from 'prop-types';
import { CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const SuccessFeedback = ({ onReset }) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center h-full">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Envoyé !</h3>
            <p className="text-gray-500 max-w-md mb-8">
                Merci de nous avoir contactés. Notre équipe a bien reçu votre demande et reviendra vers vous dans les plus brefs délais (généralement sous 24h).
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/">
                    <Button variant="outline">Retour à l'accueil</Button>
                </Link>
                <Button onClick={onReset} variant="default">Envoyer un autre message</Button>
            </div>
        </div>
    );
};

SuccessFeedback.propTypes = {
    onReset: PropTypes.func.isRequired,
};

export default SuccessFeedback;
