import React from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

const WCPBadge = ({ children, variant = 'default', className = '' }) => {
    const variants = {
        default: 'bg-gray-100 text-gray-800',
        primary: 'bg-wcp-blue-600 text-white',
        secondary: 'bg-wcp-dark text-white',
        outline: 'bg-white text-gray-800 border border-gray-300',
        exclusive: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        price: 'bg-white/90 backdrop-blur-sm text-wcp-dark font-bold shadow-sm',
    };

    return (
        <span className={twMerge(`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium ${variants[variant]}`, className)}>
            {children}
        </span>
    );
};

WCPBadge.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'outline', 'exclusive', 'price']),
    className: PropTypes.string,
};

export default WCPBadge;
