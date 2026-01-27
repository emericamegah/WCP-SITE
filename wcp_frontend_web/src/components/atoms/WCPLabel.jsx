import React from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const WCPLabel = ({ htmlFor, children, className, required }) => {
    return (
        <label
            htmlFor={htmlFor}
            className={twMerge(clsx("block text-sm font-medium text-gray-700 mb-1", className))}
        >
            {children}
            {required && <span className="text-red-500 ml-1">*</span>}
        </label>
    );
};

WCPLabel.propTypes = {
    htmlFor: PropTypes.string,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    required: PropTypes.bool,
};

export default WCPLabel;
