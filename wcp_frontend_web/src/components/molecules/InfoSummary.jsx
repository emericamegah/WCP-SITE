import React from 'react';
import PropTypes from 'prop-types';
import FeatureIcon from '../atoms/FeatureIcon';

const InfoSummary = ({ features }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-gray-100 my-8">
            {features.map((feature, index) => (
                <FeatureIcon
                    key={index}
                    iconName={feature.icon}
                    label={feature.label}
                    value={feature.value}
                />
            ))}
        </div>
    );
};

InfoSummary.propTypes = {
    features: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
    })).isRequired
};

export default InfoSummary;
