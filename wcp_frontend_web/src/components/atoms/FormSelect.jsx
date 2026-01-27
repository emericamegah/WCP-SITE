import React from 'react';
import PropTypes from 'prop-types';
import { ChevronDown } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const FormSelect = React.forwardRef(({
    options,
    placeholder = "Sélectionner...",
    error = false,
    disabled = false,
    className = '',
    ...props
}, ref) => {
    return (
        <div className="relative">
            <select
                ref={ref}
                disabled={disabled}
                className={twMerge(
                    "block w-full px-4 py-2.5 pr-10 text-sm bg-white border rounded-lg appearance-none transition-all duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-offset-1",
                    error
                        ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-200",
                    disabled && "bg-gray-100 text-gray-500 cursor-not-allowed",
                    className
                )}
                {...props}
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <ChevronDown
                    size={18}
                    className={disabled ? "text-gray-400" : "text-gray-600"}
                />
            </div>
        </div>
    );
});

FormSelect.displayName = 'FormSelect';

FormSelect.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    placeholder: PropTypes.string,
    error: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
};

export default FormSelect;
