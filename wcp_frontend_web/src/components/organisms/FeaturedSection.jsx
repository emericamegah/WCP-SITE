import React from 'react';
import PropertyCard from '../molecules/PropertyCard';

const FeaturedSection = ({ properties = [] }) => {
    // If no properties passed (or loading), show empty or loading state
    // For now we just use the passed array. 

    return (
        <section className="container mx-auto px-4 py-16" id="biens">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nos Biens à la Une</h2>
                <div className="h-1 w-20 bg-wcp-blue-600 mx-auto rounded-full"></div>
                <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                    Découvrez notre sélection exclusive de propriétés sélectionnées avec soin pour leur caractère unique.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties.map(prop => (
                    <div key={prop.id} className="h-full">
                        <PropertyCard
                            title={prop.title}
                            price={prop.price}
                            location={prop.location}
                            image={prop.image}
                            badgeText={prop.badgeText}
                            badgeColor={prop.badgeColor}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturedSection;
