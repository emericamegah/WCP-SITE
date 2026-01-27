import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const DatePickerAtome = ({ value, onChange, label, minDate }) => {
    return (
        <div className="w-full">
            {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
            <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon name="Calendar" className="text-gray-400" size={18} />
                </div>
                <input
                    type="date"
                    className="bg-white border focus:ring-wcp-blue-500 focus:border-wcp-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                    value={value}
                    min={minDate}
                    onChange={onChange}
                />
            </div>
        </div>
    );
};

DatePickerAtome.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    minDate: PropTypes.string,
};

export default DatePickerAtome;
