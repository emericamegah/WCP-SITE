import React from 'react';
import PropTypes from 'prop-types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const StatBadge = ({ value, trend = 'neutral', size = 'md', className = '' }) => {
    const trends = {
        up: {
            icon: TrendingUp,
            bg: 'bg-green-50',
            text: 'text-green-700',
            border: 'border-green-200'
        },
        down: {
            icon: TrendingDown,
            bg: 'bg-red-50',
            text: 'text-red-700',
            border: 'border-red-200'
        },
        neutral: {
            icon: Minus,
            bg: 'bg-gray-50',
            text: 'text-gray-700',
            border: 'border-gray-200'
        }
    };

    const sizes = {
        sm: 'text-xs px-2 py-1',
        md: 'text-sm px-3 py-1.5',
        lg: 'text-base px-4 py-2'
    };

    const config = trends[trend];
    const Icon = config.icon;

    return (
        <span
            className={twMerge(
                "inline-flex items-center gap-1.5 font-semibold rounded-full border",
                config.bg,
                config.text,
                config.border,
                sizes[size],
                className
            )}
        >
            <Icon size={size === 'sm' ? 12 : size === 'md' ? 14 : 16} />
            <span>{value}</span>
        </span>
    );
};

StatBadge.propTypes = {
    value: PropTypes.string.isRequired,
    trend: PropTypes.oneOf(['up', 'down', 'neutral']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    className: PropTypes.string,
};

export default StatBadge;
