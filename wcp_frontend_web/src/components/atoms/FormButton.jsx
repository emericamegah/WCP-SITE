import React from 'react';
import PropTypes from 'prop-types';
import { Loader2 } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const FormButton = ({
    children,
    variant = 'primary',
    loading = false,
    disabled = false,
    type = 'button',
    onClick,
    className = '',
    fullWidth = false,
    icon: Icon,
    ...props
}) => {
    const baseClasses = "inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm",
        secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 shadow-sm",
        outline: "border-2 border-blue-600 text-blue-600 bg-white hover:bg-blue-50 focus:ring-blue-500",
        ghost: "text-gray-700 bg-transparent hover:bg-gray-100 focus:ring-gray-500",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm",
    };

    const isDisabled = disabled || loading;

    return (
        <button
            type={type}
            disabled={isDisabled}
            onClick={onClick}
            className={twMerge(
                baseClasses,
                variants[variant] || variants.primary,
                fullWidth && "w-full",
                className
            )}
            {...props}
        >
            {loading && <Loader2 size={18} className="animate-spin" />}
            {!loading && Icon && <Icon size={18} />}
            {children}
        </button>
    );
};

FormButton.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost', 'danger']),
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    onClick: PropTypes.func,
    className: PropTypes.string,
    fullWidth: PropTypes.bool,
    icon: PropTypes.elementType,
};

export default FormButton;
