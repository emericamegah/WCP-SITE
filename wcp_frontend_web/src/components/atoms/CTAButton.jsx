import React from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

const CTAButton = ({ children, onClick, className = '', type = 'button' }) => {
    return (
        <button
            type={type}
            className={twMerge("bg-wcp-dark hover:bg-wcp-blue-900 text-white font-bold py-3 px-8 rounded-md transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5", className)}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

CTAButton.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default CTAButton;
