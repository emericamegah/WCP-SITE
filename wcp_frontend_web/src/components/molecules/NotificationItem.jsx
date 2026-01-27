import React from 'react';
import PropTypes from 'prop-types';
import { AlertCircle, Info, AlertTriangle, ArrowRight } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const NotificationItem = ({
    type = 'info',
    title,
    message,
    date,
    onAction,
    actionLabel = 'Voir détails',
    isRead = false,
    className = ''
}) => {
    const types = {
        warning: {
            icon: AlertTriangle,
            bg: 'bg-orange-50',
            border: 'border-orange-200',
            iconColor: 'text-orange-600',
            titleColor: 'text-orange-900'
        },
        info: {
            icon: Info,
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            iconColor: 'text-blue-600',
            titleColor: 'text-blue-900'
        },
        danger: {
            icon: AlertCircle,
            bg: 'bg-red-50',
            border: 'border-red-200',
            iconColor: 'text-red-600',
            titleColor: 'text-red-900'
        }
    };

    const config = types[type];
    const Icon = config.icon;

    return (
        <div className={twMerge(
            "rounded-lg border p-4 transition-all duration-200",
            config.bg,
            config.border,
            isRead ? 'opacity-60' : '',
            className
        )}>
            <div className="flex items-start gap-3">
                {/* Icon */}
                <div className={twMerge(
                    "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center",
                    config.bg,
                    config.iconColor
                )}>
                    <Icon size={20} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className={twMerge(
                            "font-semibold text-sm",
                            config.titleColor
                        )}>
                            {title}
                            {!isRead && (
                                <span className="ml-2 inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                            )}
                        </h4>
                        {date && (
                            <span className="text-xs text-gray-500 flex-shrink-0">
                                {new Date(date).toLocaleDateString('fr-FR', {
                                    day: 'numeric',
                                    month: 'short'
                                })}
                            </span>
                        )}
                    </div>

                    <p className="text-sm text-gray-700 mb-3">
                        {message}
                    </p>

                    {onAction && (
                        <button
                            onClick={onAction}
                            className={twMerge(
                                "inline-flex items-center gap-1 text-sm font-semibold transition-colors",
                                config.iconColor,
                                "hover:opacity-80"
                            )}
                        >
                            {actionLabel}
                            <ArrowRight size={14} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

NotificationItem.propTypes = {
    type: PropTypes.oneOf(['warning', 'info', 'danger']),
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    date: PropTypes.string,
    onAction: PropTypes.func,
    actionLabel: PropTypes.string,
    isRead: PropTypes.bool,
    className: PropTypes.string,
};

export default NotificationItem;
