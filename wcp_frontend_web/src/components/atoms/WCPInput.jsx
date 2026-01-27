import React from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

const WCPInput = React.forwardRef(({
    type = 'text',
    placeholder,
    error = false,
    disabled = false,
    className = '',
    ...props
}, ref) => {
    return (
        <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            className={twMerge(
                "block w-full px-4 py-2.5 text-sm bg-white border rounded-lg transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-offset-1",
                error
                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-200",
                disabled && "bg-gray-100 text-gray-500 cursor-not-allowed",
                className
            )}
            {...props}
        />
    );
});

WCPInput.displayName = 'WCPInput';

WCPInput.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    error: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
};

export default WCPInput;
