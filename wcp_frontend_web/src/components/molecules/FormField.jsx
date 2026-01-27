import React from 'react';
import PropTypes from 'prop-types';
import WCPLabel from '../atoms/WCPLabel';

const FormField = ({ label, error, required, children, className }) => {
    return (
        <div className={className}>
            {label && <WCPLabel required={required}>{label}</WCPLabel>}
            {children}
            {error && (
                <p className="mt-1 text-xs text-red-500 font-medium">
                    {error.message}
                </p>
            )}
        </div>
    );
};

FormField.propTypes = {
    label: PropTypes.string,
    error: PropTypes.shape({ message: PropTypes.string }),
    required: PropTypes.bool,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default FormField;
