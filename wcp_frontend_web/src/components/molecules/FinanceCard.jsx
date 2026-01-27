import React from 'react';
import PropTypes from 'prop-types';
import { TrendingUp, Wallet, DollarSign, PiggyBank } from 'lucide-react';
import StatBadge from '../atoms/StatBadge';
import { twMerge } from 'tailwind-merge';

const FinanceCard = ({
    title,
    amount,
    trend,
    icon: Icon,
    type = 'revenue',
    className = ''
}) => {
    const types = {
        revenue: {
            iconBg: 'bg-green-100',
            iconColor: 'text-green-600',
            defaultIcon: TrendingUp
        },
        charges: {
            iconBg: 'bg-red-100',
            iconColor: 'text-red-600',
            defaultIcon: Wallet
        },
        net: {
            iconBg: 'bg-blue-100',
            iconColor: 'text-[#1E3A8A]',
            defaultIcon: PiggyBank
        },
        fees: {
            iconBg: 'bg-orange-100',
            iconColor: 'text-orange-600',
            defaultIcon: DollarSign
        }
    };

    const config = types[type];
    const IconComponent = Icon || config.defaultIcon;

    // Format number with spaces for thousands
    const formatAmount = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

    return (
        <div
            className={twMerge(
                "bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-sm hover:shadow-md transition-shadow duration-200",
                className
            )}
        >
            <div className="flex items-start justify-between mb-4">
                <div className={twMerge(
                    "w-12 h-12 rounded-lg flex items-center justify-center",
                    config.iconBg
                )}>
                    <IconComponent className={config.iconColor} size={24} />
                </div>
                {trend && (
                    <StatBadge
                        value={trend.value}
                        trend={trend.direction}
                        size="sm"
                    />
                )}
            </div>

            <h3 className="text-sm font-medium text-gray-600 mb-2">
                {title}
            </h3>

            <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[#111827]">
                    {formatAmount(amount)}
                </span>
                <span className="text-sm text-gray-500">FCFA</span>
            </div>

            {trend && (
                <p className="text-xs text-gray-500 mt-2">
                    vs mois précédent
                </p>
            )}
        </div>
    );
};

FinanceCard.propTypes = {
    title: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    trend: PropTypes.shape({
        value: PropTypes.string.isRequired,
        direction: PropTypes.oneOf(['up', 'down', 'neutral']).isRequired
    }),
    icon: PropTypes.elementType,
    type: PropTypes.oneOf(['revenue', 'charges', 'net', 'fees']),
    className: PropTypes.string,
};

export default FinanceCard;
