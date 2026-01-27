import React from 'react';
import PropTypes from 'prop-types';
import SectionHeading from '../atoms/SectionHeading';
import CheckListItem from '../molecules/CheckListItem';

const PropertyDescription = ({ description, amenities }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
            <SectionHeading className="mb-6">Description</SectionHeading>
            <div className="prose max-w-none text-gray-600 mb-10 leading-relaxed whitespace-pre-line">
                {description}
            </div>

            <SectionHeading className="mb-6">Caractéristiques & Équipements</SectionHeading>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {amenities.map((amenity, index) => (
                    <CheckListItem key={index} text={amenity} />
                ))}
            </div>
        </div>
    );
};

PropertyDescription.propTypes = {
    description: PropTypes.string.isRequired,
    amenities: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PropertyDescription;
