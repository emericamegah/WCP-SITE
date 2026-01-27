import React from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

const FormLabel = ({ htmlFor, children, required = false, className = '', tooltip }) => {
    return (
        <div className="flex items-center gap-2">
            <label
                htmlFor={htmlFor}
                className={twMerge(
                    "block text-sm font-semibold text-gray-700 dark:text-gray-300",
                    className
                )}
            >
                {children}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {tooltip && (
                <span className="text-xs text-gray-500 italic">
                    ({tooltip})
                </span>
            )}
        </div>
    );
};

FormLabel.propTypes = {
    htmlFor: PropTypes.string,
    children: PropTypes.node.isRequired,
    required: PropTypes.bool,
    className: PropTypes.string,
    tooltip: PropTypes.string,
};

export default FormLabel;
