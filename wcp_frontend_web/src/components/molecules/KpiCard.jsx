import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Icon from '../atoms/Icon';
import { cn } from '../../lib/utils';

const KpiCard = ({ title, value, change, icon, trend }) => {
    const isPositive = trend === 'up';
    const isNeutral = trend === 'neutral';

    let trendColor = 'text-green-500';
    if (!isPositive && !isNeutral) trendColor = 'text-red-500';
    if (isNeutral) trendColor = 'text-gray-500';

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle>
                <Icon name={icon} className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className={cn("text-xs flex items-center mt-1", trendColor)}>
                    {change && (
                        <>
                            <Icon name={isPositive ? 'TrendingUp' : isNeutral ? 'Minus' : 'TrendingDown'} size={12} className="mr-1" />
                            {change}
                        </>
                    )}
                    {!change && <span className="text-muted-foreground">Pas de changement</span>}
                </p>
            </CardContent>
        </Card>
    );
};

export default KpiCard;
