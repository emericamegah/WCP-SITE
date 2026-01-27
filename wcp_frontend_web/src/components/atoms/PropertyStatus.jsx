import React from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

const PropertyStatus = ({ status, className = '' }) => {
    const statuses = {
        loué: {
            label: 'Loué',
            bg: 'bg-green-100',
            text: 'text-green-800',
            border: 'border-green-200'
        },
        vacant: {
            label: 'Vacant',
            bg: 'bg-orange-100',
            text: 'text-orange-800',
            border: 'border-orange-200'
        },
        maintenance: {
            label: 'En maintenance',
            bg: 'bg-blue-100',
            text: 'text-blue-800',
            border: 'border-blue-200'
        }
    };

    const config = statuses[status] || statuses.vacant;

    return (
        <span
            className={twMerge(
                "inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border",
                config.bg,
                config.text,
                config.border,
                className
            )}
        >
            {config.label}
        </span>
    );
};

PropertyStatus.propTypes = {
    status: PropTypes.oneOf(['loué', 'vacant', 'maintenance']).isRequired,
    className: PropTypes.string,
};

export default PropertyStatus;
