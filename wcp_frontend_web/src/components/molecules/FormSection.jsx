import React from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

const FormSection = ({
    title,
    description,
    icon: Icon,
    children,
    className = ''
}) => {
    return (
        <div className={twMerge(
            "bg-white rounded-xl border border-gray-200 p-6 shadow-sm",
            className
        )}>
            {(title || Icon) && (
                <div className="mb-6 pb-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        {Icon && (
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                                <Icon size={20} />
                            </div>
                        )}
                        <div>
                            {title && (
                                <h3 className="text-lg font-bold text-gray-900">
                                    {title}
                                </h3>
                            )}
                            {description && (
                                <p className="text-sm text-gray-600 mt-1">
                                    {description}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
            <div className="space-y-5">
                {children}
            </div>
        </div>
    );
};

FormSection.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    icon: PropTypes.elementType,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default FormSection;
