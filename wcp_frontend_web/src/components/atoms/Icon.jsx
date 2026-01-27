import React from 'react';
import PropTypes from 'prop-types';
import * as LucideIcons from 'lucide-react';

const Icon = ({ name, className = '', size = 20 }) => {
    const LucideIcon = LucideIcons[name];

    if (!LucideIcon) {
        console.warn(`Icon "${name}" not found in Lucide React`);
        return null;
    }

    return <LucideIcon className={className} size={size} />;
};

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    size: PropTypes.number,
};

export default Icon;
