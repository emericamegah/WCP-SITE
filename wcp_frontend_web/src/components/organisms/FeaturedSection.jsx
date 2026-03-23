import React from 'react';
import PropertyCard from '../molecules/PropertyCard';

const FeaturedSection = ({ properties = [] }) => {
    // If no properties passed (or loading), show empty or loading state
    // For now we just use the passed array. 

    return (
        <section className="container mx-auto px-4 py-24" id="biens">
            <div className="text-center mb-16">
                <h2 className="text-5xl md:text-6xl font-cursive text-wcp-dark-900 mb-6 tracking-wide">Propriétés d'Exception</h2>
                <div className="h-1 w-24 bg-gradient-to-r from-wcp-blue-400 to-wcp-blue-600 mx-auto rounded-full"></div>
                <p className="text-gray-500 mt-6 max-w-3xl mx-auto text-lg font-light leading-relaxed">
                    Découvrez notre collection privée de résidences luxueuses, sélectionnées avec la plus grande exigence pour vous offrir l'art de vivre à son apogée.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-12">
                {properties.map((prop, index) => {
                    // Create an asymmetrical bento grid pattern out of the cards
                    const spanClass = index % 4 === 0 
                        ? "md:col-span-4 lg:col-span-4" 
                        : index % 4 === 1 
                        ? "md:col-span-2 lg:col-span-2" 
                        : index % 4 === 2
                        ? "md:col-span-2 lg:col-span-3"
                        : "md:col-span-2 lg:col-span-3";

                    return (
                        <div key={prop.id} className={`h-full ${spanClass}`}>
                            <PropertyCard
                                title={prop.title}
                                price={prop.price}
                                location={prop.location}
                                image={prop.image}
                                badgeText={prop.badgeText}
                                badgeColor={prop.badgeColor}
                            />
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default FeaturedSection;
