import React from 'react';
import { useNavigate } from 'react-router-dom';
import CTAButton from '../atoms/CTAButton';

const GlobalCTA = () => {
    const navigate = useNavigate();
    return (
        <section className="bg-wcp-blue-600 py-16 text-white text-center">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à concrétiser votre projet ?</h2>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                    Contactez nos experts dès aujourd'hui pour une étude personnalisée de vos besoins immobiliers.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <CTAButton
                        onClick={() => navigate('/ajouter-un-bien')}
                        className="bg-white text-wcp-blue-600 hover:bg-gray-100 hover:text-wcp-blue-700"
                    >
                        Demander une estimation
                    </CTAButton>
                    <CTAButton
                        onClick={() => navigate('/contact')}
                        className="bg-wcp-blue-800 text-white hover:bg-wcp-blue-900 border border-wcp-blue-700"
                    >
                        Contactez-nous
                    </CTAButton>
                </div>
            </div>
        </section>
    );
};

export default GlobalCTA;
