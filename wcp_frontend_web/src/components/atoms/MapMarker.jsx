import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const MapMarker = ({ type = 'default', className = '' }) => {
    const baseClasses = "relative flex items-center justify-center w-8 h-8 rounded-full shadow-md transform hover:scale-110 transition-transform duration-200 cursor-pointer";
    const typeClasses = {
        default: "bg-wcp-blue-600 text-white",
        active: "bg-wcp-dark text-white ring-2 ring-white",
    };

    return (
        <div className={`${baseClasses} ${typeClasses[type] || typeClasses.default} ${className}`}>
            <Icon name="Home" size={16} />
            <div className="absolute -bottom-1 w-2 h-2 bg-inherit transform rotate-45"></div>
        </div>
    );
};

MapMarker.propTypes = {
    type: PropTypes.oneOf(['default', 'active']),
    className: PropTypes.string,
};

export default MapMarker;
