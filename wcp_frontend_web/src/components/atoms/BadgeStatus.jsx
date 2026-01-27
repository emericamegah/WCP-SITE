import React from 'react';
import PropTypes from 'prop-types';

const BadgeStatus = ({ type }) => {
    const statusConfig = {
        rent: { label: 'À Louer', color: 'bg-green-100 text-green-800 border-green-200' },
        sale: { label: 'À Vendre', color: 'bg-blue-100 text-blue-800 border-blue-200' },
        sold: { label: 'Vendu', color: 'bg-gray-100 text-gray-600 border-gray-200' },
    };

    const config = statusConfig[type] || statusConfig.sale;

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded border text-xs font-semibold uppercase tracking-wide ${config.color}`}>
            {config.label}
        </span>
    );
};

BadgeStatus.propTypes = {
    type: PropTypes.oneOf(['rent', 'sale', 'sold']).isRequired,
};

export default BadgeStatus;
