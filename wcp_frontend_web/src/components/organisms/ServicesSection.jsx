import React from 'react';
import ServiceCard from '../molecules/ServiceCard';

const ServicesSection = ({ services = [] }) => {

    return (
        <section className="bg-gray-50 py-16" id="services">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nos Services</h2>
                    <div className="h-1 w-20 bg-wcp-blue-600 mx-auto rounded-full"></div>
                </div>
                <div className="flex flex-wrap justify-center gap-6">
                    {services.map(service => (
                        <div key={service.id} className="w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(25%-1.5rem)] max-w-sm">
                            <ServiceCard
                                iconName={service.icon}
                                title={service.title}
                                description={service.description}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
