import React from 'react';
import PropTypes from 'prop-types';

const Badge = ({ text, color = 'primary' }) => {
    const colorClasses = {
        primary: 'bg-wcp-blue-100 text-wcp-blue-800',
        secondary: 'bg-gray-100 text-gray-800',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-yellow-100 text-yellow-800',
        danger: 'bg-red-100 text-red-800',
    };

    const selectedColor = colorClasses[color] || colorClasses.primary;

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${selectedColor}`}>
            {text}
        </span>
    );
};

Badge.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'danger']),
};

export default Badge;
