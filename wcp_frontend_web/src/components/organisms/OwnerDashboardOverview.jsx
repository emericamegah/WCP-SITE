import React, { useState, useEffect } from 'react';
import { Building2, TrendingUp, Users } from 'lucide-react';
import FinanceCard from '../molecules/FinanceCard';
import MonthlyRevenueChart from '../molecules/MonthlyRevenueChart';
import NotificationItem from '../molecules/NotificationItem';
import PropertyMiniature from '../molecules/PropertyMiniature';
import SkeletonCard from '../atoms/SkeletonCard';
import {
    financialSummary,
    ownerProperties,
    ownerNotifications,
    getOccupancyRate,
    ownerProfile
} from '../../api/ownerMockData';

const OwnerDashboardOverview = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading
        setTimeout(() => setLoading(false), 800);
    }, []);

    const formatAmount = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

    const occupancyRate = getOccupancyRate();
    const rentedProperties = ownerProperties.filter(p => p.status === 'loué');
    const vacantProperties = ownerProperties.filter(p => p.status === 'vacant');
    const unreadNotifications = ownerNotifications.filter(n => !n.isRead);

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <SkeletonCard height="140px" lines={2} />
                    <SkeletonCard height="140px" lines={2} />
                    <SkeletonCard height="140px" lines={2} />
                </div>
                <SkeletonCard height="400px" lines={5} />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Page Title */}
            <div>
                <h2 className="text-3xl font-bold text-[#111827] mb-2">
                    Tableau de bord
                </h2>
                <p className="text-gray-600">
                    Vue d'ensemble de votre patrimoine immobilier - {financialSummary.currentMonth.month}
                </p>
            </div>

            {/* Financial Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FinanceCard
                    title="Revenus Bruts"
                    amount={financialSummary.currentMonth.grossRevenue}
                    trend={financialSummary.currentMonth.trends.revenue}
                    type="revenue"
                />
                <FinanceCard
                    title="Charges Totales"
                    amount={financialSummary.currentMonth.charges}
                    trend={financialSummary.currentMonth.trends.charges}
                    type="charges"
                />
                <FinanceCard
                    title="Revenu Net"
                    amount={financialSummary.currentMonth.netRevenue}
                    trend={financialSummary.currentMonth.trends.net}
                    type="net"
                />
            </div>

            {/* Revenue Chart */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-sm">
                <h3 className="text-xl font-bold text-[#111827] mb-6">
                    Évolution des Revenus (12 derniers mois)
                </h3>
                <MonthlyRevenueChart data={financialSummary.yearlyRevenue} height={350} />
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Notifications Panel - 2/3 */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-[#111827]">
                                Notifications
                            </h3>
                            <span className="text-sm text-gray-600">
                                {unreadNotifications.length} non lues
                            </span>
                        </div>

                        {unreadNotifications.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <TrendingUp className="text-green-600" size={32} />
                                </div>
                                <p className="text-gray-600">
                                    Aucune notification en attente
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {unreadNotifications.slice(0, 5).map((notification) => (
                                    <NotificationItem
                                        key={notification.id}
                                        type={notification.type}
                                        title={notification.title}
                                        message={notification.message}
                                        date={notification.date}
                                        isRead={notification.isRead}
                                        onAction={() => alert(`Action: ${notification.title}`)}
                                    />
                                ))}
                            </div>
                        )}

                        {ownerNotifications.length > 5 && (
                            <button className="w-full mt-4 px-4 py-2 text-sm font-semibold text-[#1E3A8A] hover:bg-blue-50 rounded-lg transition-colors">
                                Voir toutes les notifications
                            </button>
                        )}
                    </div>
                </div>

                {/* Portfolio Status - 1/3 */}
                <div className="space-y-6">
                    {/* Stats Card */}
                    <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-[#111827] mb-6">
                            État du Parc
                        </h3>

                        <div className="space-y-4">
                            {/* Total Properties */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <Building2 size={20} className="text-[#1E3A8A]" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Total biens</p>
                                        <p className="text-xl font-bold text-[#111827]">
                                            {ownerProperties.length}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-600">Taux d'occupation</span>
                                    <span className="text-sm font-bold text-[#111827]">
                                        {occupancyRate}%
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-[#1E3A8A] h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${occupancyRate}%` }}
                                    ></div>
                                </div>
                                <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
                                    <span>{rentedProperties.length} loués</span>
                                    <span>{vacantProperties.length} vacants</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-4">
                                <p className="text-sm text-gray-600 mb-1">
                                    Valeur du portfolio
                                </p>
                                <p className="text-xl font-bold text-[#1E3A8A]">
                                    {formatAmount(ownerProfile.totalPortfolioValue)} FCFA
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Access - Latest Property */}
                    {rentedProperties.length > 0 && (
                        <div>
                            <h4 className="text-sm font-semibold text-gray-700 mb-3">
                                Accès rapide
                            </h4>
                            <PropertyMiniature
                                property={rentedProperties[0]}
                                layout="vertical"
                                onManage={(property) => alert(`Gérer: ${property.title}`)}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OwnerDashboardOverview;
