import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const WCPSelect = ({ options, value, onChange, placeholder, iconName, className = '' }) => {
    return (
        <div className={`relative ${className}`}>
            {iconName && (
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon name={iconName} className="text-gray-400" size={18} />
                </div>
            )}
            <select
                value={value}
                onChange={onChange}
                className={`bg-white block w-full pl-${iconName ? '10' : '3'} pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-wcp-blue-500 focus:border-wcp-blue-500 sm:text-sm rounded-md shadow-sm appearance-none border`}
            >
                <option value="" disabled>{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <Icon name="ChevronDown" className="text-gray-400" size={16} />
            </div>
        </div>
    );
};

WCPSelect.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    iconName: PropTypes.string,
    className: PropTypes.string,
};

export default WCPSelect;
