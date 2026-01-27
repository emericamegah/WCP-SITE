import React from 'react';
import { DollarSign, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import { apporteurCommissions } from '../../api/apporteurMockData';
import StatusPill from '../atoms/StatusPill';

const CommissionTracking = () => {
    const totalPaid = apporteurCommissions
        .filter(c => c.status === 'paid')
        .reduce((sum, c) => sum + c.amount, 0);

    const totalPending = apporteurCommissions
        .filter(c => c.status === 'pending')
        .reduce((sum, c) => sum + c.amount, 0);

    const stats = [
        {
            title: 'Commissions Payées',
            value: `${totalPaid.toLocaleString()} FCFA`,
            icon: CheckCircle,
            color: 'text-green-600',
            bgColor: 'bg-green-50'
        },
        {
            title: 'En Attente',
            value: `${totalPending.toLocaleString()} FCFA`,
            icon: Clock,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50'
        },
        {
            title: 'Total Généré',
            value: `${(totalPaid + totalPending).toLocaleString()} FCFA`,
            icon: TrendingUp,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50'
        }
    ];

    return (
        <div className="space-y-6 animate-fadeIn">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Suivi des Commissions</h1>
                <p className="text-slate-600 mt-2">Consultez l'historique de vos gains et paiements</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map((stat) => {
                    const IconComponent = stat.icon;
                    return (
                        <div
                            key={stat.title}
                            className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                                    <IconComponent className={stat.color} size={24} />
                                </div>
                                <div>
                                    <p className="text-slate-600 text-sm font-medium">{stat.title}</p>
                                    <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Commissions Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="p-6 border-b border-slate-200">
                    <h2 className="text-xl font-bold text-slate-900">Historique Complet</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                                    Identifiant
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                                    Apport Associé
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                                    Description
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                                    Montant
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
                            {apporteurCommissions.map((commission) => (
                                <tr key={commission.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                                        {commission.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                        {commission.referralId}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-900">
                                        {commission.description}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                                        {commission.amount.toLocaleString()} FCFA
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                        {new Date(commission.date).toLocaleDateString('fr-FR')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <StatusPill status={commission.status} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {apporteurCommissions.length === 0 && (
                    <div className="p-12 text-center text-slate-500">
                        <DollarSign size={48} className="mx-auto mb-4 text-slate-300" />
                        <p className="text-lg font-semibold">Aucune commission pour le moment</p>
                        <p className="text-sm mt-2">Commencez par soumettre vos premiers apports</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommissionTracking;
