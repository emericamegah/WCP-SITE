import React from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const WCPSelectCustom = React.forwardRef(({ className, error, options, placeholder, ...props }, ref) => {
    return (
        <div className="relative">
            <select
                ref={ref}
                className={twMerge(
                    clsx(
                        "w-full px-4 py-2 border rounded-lg appearance-none bg-white",
                        "focus:ring-2 focus:outline-none transition-colors",
                        "text-gray-900",
                        error
                            ? "border-red-300 focus:ring-red-200 focus:border-red-500"
                            : "border-gray-200 focus:ring-wcp-blue-100 focus:border-wcp-blue-900",
                        className
                    )
                )}
                {...props}
            >
                {placeholder && (
                    <option value="" disabled selected>
                        {placeholder}
                    </option>
                )}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
            </div>
        </div>
    );
});

WCPSelectCustom.displayName = 'WCPSelectCustom';

WCPSelectCustom.propTypes = {
    className: PropTypes.string,
    error: PropTypes.bool,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    placeholder: PropTypes.string,
};

export default WCPSelectCustom;
