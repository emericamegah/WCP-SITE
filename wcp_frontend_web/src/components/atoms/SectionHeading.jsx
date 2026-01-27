import React from 'react';
import PropTypes from 'prop-types';

const SectionHeading = ({ children, className = '' }) => {
    return (
        <div className={`inline-block mb-8 ${className}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {children}
            </h2>
            <div className="h-1 w-24 bg-wcp-blue-600 rounded-full"></div>
        </div>
    );
};

SectionHeading.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default SectionHeading;
