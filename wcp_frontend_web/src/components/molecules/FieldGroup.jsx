import React from 'react';
import PropTypes from 'prop-types';
import FormLabel from '../atoms/FormLabel';
import WCPInput from '../atoms/WCPInput';
import FormError from '../atoms/FormError';

const FieldGroup = ({
    label,
    name,
    required = false,
    error,
    tooltip,
    register,
    type = 'text',
    placeholder,
    disabled = false,
    className = '',
    ...inputProps
}) => {
    return (
        <div className={className}>
            <FormLabel
                htmlFor={name}
                required={required}
                tooltip={tooltip}
            >
                {label}
            </FormLabel>
            <div className="mt-1">
                <WCPInput
                    id={name}
                    type={type}
                    placeholder={placeholder}
                    error={!!error}
                    disabled={disabled}
                    {...(register ? register(name) : {})}
                    {...inputProps}
                />
            </div>
            <FormError message={error?.message} />
        </div>
    );
};

FieldGroup.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    required: PropTypes.bool,
    error: PropTypes.object,
    tooltip: PropTypes.string,
    register: PropTypes.func,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,
};

export default FieldGroup;
