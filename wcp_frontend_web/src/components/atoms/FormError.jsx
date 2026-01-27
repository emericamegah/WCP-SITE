import React from 'react';
import PropTypes from 'prop-types';
import { AlertCircle } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const FormError = ({ message, className = '' }) => {
    if (!message) return null;

    return (
        <div
            className={twMerge(
                "flex items-start gap-2 mt-1 text-sm text-red-600 animate-in fade-in slide-in-from-top-1 duration-200",
                className
            )}
        >
            <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
            <span>{message}</span>
        </div>
    );
};

FormError.propTypes = {
    message: PropTypes.string,
    className: PropTypes.string,
};

export default FormError;
