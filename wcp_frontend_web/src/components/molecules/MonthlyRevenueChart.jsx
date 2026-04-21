import React from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Custom tooltip
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                <p className="text-sm font-semibold text-[#111827] mb-2">
                    {payload[0].payload.month}
                </p>
                <p className="text-sm text-green-600">
                    Revenus: {payload[0].value.toLocaleString()} FCFA
                </p>
                {payload[1] && (
                    <p className="text-sm text-red-600">
                        Charges: {payload[1].value.toLocaleString()} FCFA
                    </p>
                )}
                {payload[2] && (
                    <p className="text-sm text-blue-600 font-semibold mt-1">
                        Net: {payload[2].value.toLocaleString()} FCFA
                    </p>
                )}
            </div>
        );
    }
    return null;
};

CustomTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.array
};

const MonthlyRevenueChart = ({ data, height = 300, className = '' }) => {

    return (
        <div className={className}>
            <ResponsiveContainer width="100%" height={height}>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis
                        dataKey="month"
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                        axisLine={{ stroke: '#E5E7EB' }}
                    />
                    <YAxis
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                        axisLine={{ stroke: '#E5E7EB' }}
                        tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F3F4F6' }} />
                    <Legend
                        wrapperStyle={{ fontSize: '14px' }}
                        iconType="circle"
                    />
                    <Bar
                        dataKey="revenue"
                        fill="#10B981"
                        name="Revenus"
                        radius={[8, 8, 0, 0]}
                    />
                    <Bar
                        dataKey="charges"
                        fill="#EF4444"
                        name="Charges"
                        radius={[8, 8, 0, 0]}
                    />
                    <Bar
                        dataKey="net"
                        fill="#1E3A8A"
                        name="Net"
                        radius={[8, 8, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

MonthlyRevenueChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            month: PropTypes.string.isRequired,
            revenue: PropTypes.number.isRequired,
            charges: PropTypes.number,
            net: PropTypes.number
        })
    ).isRequired,
    type: PropTypes.oneOf(['bar', 'line']),
    height: PropTypes.number,
    className: PropTypes.string,
};

export default MonthlyRevenueChart;
