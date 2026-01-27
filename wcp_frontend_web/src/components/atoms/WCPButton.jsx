import React from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const WCPButton = ({ children, variant = 'primary', onClick, className = '', type = 'button' }) => {
    const baseClasses = "inline-flex items-center justify-center px-4 py-2 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200";

    const variants = {
        primary: "border-transparent text-white bg-primary hover:bg-primary-hover focus:ring-primary shadow-glow transition-smooth",
        secondary: "border-transparent text-foreground bg-muted hover:bg-muted-foreground/10 focus:ring-muted shadow-sm transition-smooth",
        outline: "border-primary text-primary bg-white hover:bg-primary/5 focus:ring-primary transition-smooth",
        ghost: "border-transparent text-muted-foreground bg-transparent hover:bg-muted hover:text-foreground focus:ring-muted transition-smooth",
        danger: "border-transparent text-white bg-danger hover:bg-danger/90 focus:ring-danger shadow-md transition-smooth"
    };

    return (
        <button
            type={type}
            className={twMerge(clsx(baseClasses, variants[variant] || variants.primary, className))}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

WCPButton.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost']),
    onClick: PropTypes.func,
    className: PropTypes.string,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default WCPButton;
