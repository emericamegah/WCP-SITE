import React from 'react';
import Breadcrumb from '../molecules/Breadcrumb';

const ServiceHero = () => {
    return (
        <div className="bg-wcp-dark py-12 md:py-20 text-white relative overflow-hidden">
            {/* Abstract background element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-wcp-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="mb-6">
                    <Breadcrumb items={[{ label: 'Services' }]} />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Nos Services Immobiliers
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
                    De l'estimation à la gestion locative, West Coast Property vous accompagne à chaque étape de votre projet immobilier avec une expertise sur-mesure.
                </p>
            </div>
        </div>
    );
};

export default ServiceHero;
