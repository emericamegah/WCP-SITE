import React from 'react';
import { useNavigate } from 'react-router-dom';
import SectionHeading from '../atoms/SectionHeading';
import CheckListItem from '../molecules/CheckListItem';
import CTAButton from '../atoms/CTAButton';

const PartnerSection = () => {
    const navigate = useNavigate();
    const benefits = [
        'Commissions attractives sur chaque affaire conclue',
        'Suivi transparent de vos dossiers en temps réel',
        'Espace partenaire dédié en ligne',
        'Paiement rapide de vos honoraires'
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="lg:w-1/2">
                        <img
                            src="https://placehold.co/800x600?text=Partenariat+WCP"
                            alt="Partenariat Business"
                            className="rounded-xl shadow-lg w-full object-cover h-96"
                        />
                    </div>
                    <div className="lg:w-1/2">
                        <SectionHeading>
                            Devenez Apporteur d'Affaires
                        </SectionHeading>
                        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                            Professionnels ou particuliers, valorisez votre réseau. Recommandez West Coast Property et bénéficiez d'un partenariat gagnant-gagnant.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                            {benefits.map((benefit, index) => (
                                <CheckListItem key={index} text={benefit} />
                            ))}
                        </div>

                        <CTAButton onClick={() => navigate('/apporter-des-affaires')}>
                            Rejoindre le réseau
                        </CTAButton>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PartnerSection;
