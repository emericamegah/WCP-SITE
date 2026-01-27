import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const FeatureIcon = ({ iconName, label, value }) => {
    return (
        <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg min-w-[100px] text-center">
            <div className="text-wcp-blue-600 mb-2">
                <Icon name={iconName} size={24} />
            </div>
            <span className="text-xl font-bold text-gray-900 block leading-tight">{value}</span>
            <span className="text-xs text-gray-500 uppercase tracking-wide mt-1">{label}</span>
        </div>
    );
};

FeatureIcon.propTypes = {
    iconName: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default FeatureIcon;
