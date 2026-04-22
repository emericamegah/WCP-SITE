import React from 'react';
import PropTypes from 'prop-types';
import { FileDown } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const DocButton = ({
    label,
    icon,
    onClick,
    variant = 'primary',
    disabled = false,
    className = ''
}) => {
    const IconComponent = icon || FileDown;
    const variants = {
        primary: 'bg-[#1E3A8A] text-white hover:bg-[#1E40AF] border-transparent',
        outline: 'bg-white text-[#1E3A8A] hover:bg-blue-50 border-2 border-[#1E3A8A]',
        ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 border-transparent'
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={twMerge(
                "inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg border transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                variants[variant],
                className
            )}
        >
            <IconComponent size={18} />
            <span>{label}</span>
        </button>
    );
};

DocButton.propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.elementType,
    onClick: PropTypes.func.isRequired,
    variant: PropTypes.oneOf(['primary', 'outline', 'ghost']),
    disabled: PropTypes.bool,
    className: PropTypes.string,
};

export default DocButton;
