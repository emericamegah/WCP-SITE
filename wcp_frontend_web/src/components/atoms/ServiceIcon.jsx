import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const ServiceIcon = ({ name, size = 24, className = '' }) => {
    return (
        <div className={`inline-flex items-center justify-center p-3 bg-wcp-blue-50 text-wcp-blue-900 rounded-lg ${className}`}>
            <Icon name={name} size={size} />
        </div>
    );
};

ServiceIcon.propTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.number,
    className: PropTypes.string,
};

export default ServiceIcon;
