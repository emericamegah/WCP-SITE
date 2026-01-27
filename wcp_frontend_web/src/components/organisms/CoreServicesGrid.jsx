import React from 'react';
import SectionHeading from '../atoms/SectionHeading';
import ServiceFeatureCard from '../molecules/ServiceFeatureCard';

const CoreServicesGrid = ({ services = [] }) => {

    return (
        <section className="py-16 md:py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <SectionHeading>
                        Une Expertise à 360°
                    </SectionHeading>
                    <p className="text-gray-600 max-w-2xl mx-auto mt-4">
                        Nous déployons des solutions innovantes et personnalisées pour répondre à toutes vos problématiques immobilières.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <ServiceFeatureCard
                            key={index}
                            iconName={service.icon}
                            title={service.title}
                            description={service.description}
                            benefits={service.benefits}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CoreServicesGrid;
