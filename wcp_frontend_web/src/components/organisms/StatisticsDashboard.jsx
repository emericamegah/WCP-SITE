import React from 'react';
import {
    LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell
} from 'recharts';
import { TrendingUp, ArrowUpRight, DollarSign, PieChart as PieIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const mockData = [
    { name: 'Jan', revenue: 4000, profit: 2400 },
    { name: 'Fév', revenue: 3000, profit: 1398 },
    { name: 'Mar', revenue: 2000, profit: 9800 },
    { name: 'Avr', revenue: 2780, profit: 3908 },
    { name: 'Mai', revenue: 1890, profit: 4800 },
    { name: 'Juin', revenue: 2390, profit: 3800 },
];

/**
 * StatisticsDashboard Organism
 * Displays financial charts and profitability statistics.
 */
const StatisticsDashboard = () => {
    return (
        <div className="space-y-6 animate-in">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatItem
                    label="Revenus Totaux"
                    value="12,450,000"
                    unit="FCFA"
                    trend="+12%"
                    icon={<DollarSign className="text-blue-500" />}
                />
                <StatItem
                    label="Rentabilité Moyenne"
                    value="8.4"
                    unit="%"
                    trend="+2.1%"
                    icon={<TrendingUp className="text-green-500" />}
                />
                <StatItem
                    label="Taux d'Occupation"
                    value="94"
                    unit="%"
                    trend="-1%"
                    icon={<PieIcon className="text-purple-500" />}
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Evolution */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-slate-800">Évolution des Revenus</h3>
                        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded">6 derniers mois</span>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={mockData}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#0ea5e9"
                                    fillOpacity={1}
                                    fill="url(#colorRev)"
                                    strokeWidth={3}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Profitability Bar Chart */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-slate-800">Rentabilité par Période</h3>
                        <ArrowUpRight className="text-slate-400" size={20} />
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={mockData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="profit" radius={[4, 4, 0, 0]}>
                                    {mockData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#0ea5e9' : '#0369a1'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatItem = ({ label, value, unit, trend, icon }) => (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-slate-50 rounded-lg">
                {icon}
            </div>
            <span className="text-sm font-medium text-slate-500">{label}</span>
        </div>
        <div className="flex items-end justify-between">
            <div>
                <span className="text-2xl font-bold text-slate-900">{value}</span>
                <span className="ml-1 text-sm font-semibold text-slate-500 uppercase">{unit}</span>
            </div>
            <span className={twMerge(
                "text-xs font-bold px-2 py-1 rounded-full",
                trend.startsWith('+') ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"
            )}>
                {trend}
            </span>
        </div>
    </div>
);

export default StatisticsDashboard;
