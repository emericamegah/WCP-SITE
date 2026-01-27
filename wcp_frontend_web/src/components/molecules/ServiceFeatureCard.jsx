import React from 'react';
import PropTypes from 'prop-types';
import ServiceIcon from '../atoms/ServiceIcon';

const ServiceFeatureCard = ({ iconName, title, description, benefits }) => {
    return (
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
            <div className="mb-6">
                <ServiceIcon name={iconName} size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
            <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                {description}
            </p>
            {benefits && benefits.length > 0 && (
                <ul className="space-y-2 mt-auto">
                    {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-500">
                            <span className="mr-2 text-wcp-blue-500">•</span> {benefit}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

ServiceFeatureCard.propTypes = {
    iconName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    benefits: PropTypes.arrayOf(PropTypes.string),
};

export default ServiceFeatureCard;
