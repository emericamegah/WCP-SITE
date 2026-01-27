import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../atoms/Icon';

const ServiceCard = ({ iconName, title, description }) => {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-center h-full border border-gray-100">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-wcp-blue-50 text-wcp-blue-600 mb-6">
                <Icon name={iconName} size={32} />
            </div>
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-500 leading-relaxed">{description}</p>
            </div>
        </div>
    );
};

ServiceCard.propTypes = {
    iconName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default ServiceCard;
