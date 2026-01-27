import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import Icon from '../atoms/Icon';
import PropTypes from 'prop-types';

const StatCard = ({ title, value, icon, trend, description }) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <div className="h-4 w-4 text-muted-foreground">
                    <Icon name={icon} size={16} />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {(trend || description) && (
                    <p className="text-xs text-muted-foreground mt-1">
                        {trend && <span className="text-green-500 font-medium mr-1">{trend}</span>}
                        {description}
                    </p>
                )}
            </CardContent>
        </Card>
    );
};

StatCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    icon: PropTypes.string.isRequired,
    trend: PropTypes.string,
    description: PropTypes.string
};

export default StatCard;
