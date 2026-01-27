import React from 'react';
import SectionHeading from '../atoms/SectionHeading';
import PropertyCard from '../molecules/PropertyCard';

const RelatedProperties = ({ properties }) => {
    return (
        <section className="py-12 bg-gray-50 border-t border-gray-200">
            <div className="mb-8">
                <SectionHeading>Vous aimerez aussi</SectionHeading>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {properties.map(prop => (
                    <div key={prop.id}>
                        <PropertyCard
                            image={prop.image}
                            title={prop.title}
                            price={prop.price}
                            location={prop.location}
                            status={prop.status}
                            bedrooms={prop.bedrooms}
                            area={prop.area}
                            onDownload={() => console.log('Download', prop.id)}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RelatedProperties;
