import React from 'react';

const ContactHero = () => {
    return (
        <div className="bg-wcp-dark text-white py-16 md:py-24 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Contactez-nous</h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                    Une question ? Un projet immobilier ? Notre équipe d'experts est à votre écoute pour vous accompagner.
                </p>
            </div>
        </div>
    );
};

export default ContactHero;
