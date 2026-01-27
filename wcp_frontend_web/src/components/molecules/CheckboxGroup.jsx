import React from 'react';
import PropTypes from 'prop-types';
import { Check } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const CheckboxGroup = ({
    label,
    options,
    selectedValues = [],
    onChange,
    columns = 2,
    className = ''
}) => {
    const handleCheckboxChange = (value) => {
        const newValues = selectedValues.includes(value)
            ? selectedValues.filter(v => v !== value)
            : [...selectedValues, value];
        onChange(newValues);
    };

    return (
        <div className={className}>
            {label && (
                <p className="text-sm font-semibold text-gray-700 mb-3">{label}</p>
            )}
            <div
                className={twMerge(
                    "grid gap-3",
                    columns === 2 && "grid-cols-1 sm:grid-cols-2",
                    columns === 3 && "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
                    columns === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                )}
            >
                {options.map((option) => {
                    const isChecked = selectedValues.includes(option.value);
                    return (
                        <label
                            key={option.value}
                            className={twMerge(
                                "flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200",
                                isChecked
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-200 hover:border-gray-300 bg-white"
                            )}
                        >
                            <div className="relative flex-shrink-0">
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => handleCheckboxChange(option.value)}
                                    className="sr-only"
                                />
                                <div
                                    className={twMerge(
                                        "w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200",
                                        isChecked
                                            ? "bg-blue-600 border-blue-600"
                                            : "bg-white border-gray-300"
                                    )}
                                >
                                    {isChecked && (
                                        <Check size={14} className="text-white" />
                                    )}
                                </div>
                            </div>
                            <span className={twMerge(
                                "text-sm font-medium",
                                isChecked ? "text-blue-900" : "text-gray-700"
                            )}>
                                {option.label}
                            </span>
                        </label>
                    );
                })}
            </div>
        </div>
    );
};

CheckboxGroup.propTypes = {
    label: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    selectedValues: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func.isRequired,
    columns: PropTypes.oneOf([2, 3, 4]),
    className: PropTypes.string,
};

export default CheckboxGroup;
