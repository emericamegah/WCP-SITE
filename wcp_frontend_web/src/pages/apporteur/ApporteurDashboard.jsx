import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, DollarSign, FileCheck, Award } from 'lucide-react';
import { apporteurReferrals, getApporteurStats } from '../../api/apporteurMockData';
import StatusPill from '../../components/atoms/StatusPill';
import WCPButton from '../../components/atoms/WCPButton';
import Icon from '../../components/atoms/Icon';

const ApporteurDashboard = () => {
    const navigate = useNavigate();
    const stats = getApporteurStats();

    const statCards = [
        {
            title: 'Total Apports',
            value: stats.count,
            icon: FileCheck,
            color: 'blue',
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-600'
        },
        {
            title: 'Commissions Totales',
            value: `${stats.total.toLocaleString()} FCFA`,
            icon: DollarSign,
            color: 'green',
            bgColor: 'bg-green-50',
            textColor: 'text-green-600'
        },
        {
            title: 'En Attente',
            value: `${stats.pending.toLocaleString()} FCFA`,
            icon: TrendingUp,
            color: 'orange',
            bgColor: 'bg-orange-50',
            textColor: 'text-orange-600'
        },
        {
            title: 'Taux de Réussite',
            value: stats.successRate,
            icon: Award,
            color: 'purple',
            bgColor: 'bg-purple-50',
            textColor: 'text-purple-600'
        }
    ];

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Tableau de Bord Partenaire</h1>
                    <p className="text-slate-600 mt-1">Suivez vos apports et vos gains en temps réel</p>
                </div>
                <div className="flex gap-3">
                    <WCPButton
                        onClick={() => navigate('/apporteur/submit-client')}
                        variant="outline"
                        className="border-blue-600 text-blue-600 hover:bg-blue-50"
                    >
                        <Icon name="UserPlus" size={18} className="mr-2" />
                        Apporter un Client
                    </WCPButton>
                    <WCPButton
                        onClick={() => navigate('/apporteur/submit-property')}
                        variant="primary"
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        <Icon name="Home" size={18} className="mr-2" />
                        Apporter un Bien
                    </WCPButton>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat) => {
                    const IconComponent = stat.icon;
                    return (
                        <div
                            key={stat.title}
                            className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                                    <IconComponent className={stat.textColor} size={24} />
                                </div>
                            </div>
                            <p className="text-slate-600 text-sm font-medium mb-1">{stat.title}</p>
                            <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
                        </div>
                    );
                })}
            </div>

            {/* Referrals Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="p-6 border-b border-slate-200">
                    <h2 className="text-xl font-bold text-slate-900">Mes Apports Récents</h2>
                    <p className="text-slate-600 text-sm mt-1">Statut de validation de vos dernières soumissions</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                                    Référence
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                                    Type
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                                    Nom/Bien
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                                    Statut
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            {apporteurReferrals.map((referral) => (
                                <tr key={referral.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                                        {referral.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                        {referral.type}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-medium">
                                        {referral.clientName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                        {new Date(referral.submitDate).toLocaleDateString('fr-FR')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <StatusPill status={referral.status} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ApporteurDashboard;
