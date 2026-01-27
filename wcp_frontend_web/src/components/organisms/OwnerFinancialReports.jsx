import React, { useState } from 'react';
import { FileDown, FileText, Calendar } from 'lucide-react';
import MonthlyRevenueChart from '../molecules/MonthlyRevenueChart';
import DocButton from '../atoms/DocButton';
import { financialSummary } from '../../api/ownerMockData';

const OwnerFinancialReports = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('year');

    const formatAmount = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

    const calculateTotals = () => {
        const totalRevenue = financialSummary.yearlyRevenue.reduce((sum, month) => sum + month.revenue, 0);
        const totalCharges = financialSummary.yearlyRevenue.reduce((sum, month) => sum + month.charges, 0);
        const totalNet = financialSummary.yearlyRevenue.reduce((sum, month) => sum + month.net, 0);
        const managementFees = totalRevenue * 0.1; // 10%

        return {
            totalRevenue,
            totalCharges,
            managementFees,
            totalNet
        };
    };

    const totals = calculateTotals();

    const handleExportPDF = () => {
        alert('Génération du rapport PDF en cours...');
        // TODO: Implement PDF generation
    };

    const handleExportExcel = () => {
        alert('Exportation Excel en cours...');
        // TODO: Implement Excel export
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold text-[#111827] mb-2">
                    Rapports Financiers
                </h2>
                <p className="text-gray-600">
                    Consultez vos flux financiers et exportez vos données
                </p>
            </div>

            {/* Period Selector & Export Buttons */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-sm">
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    {/* Period Selector */}
                    <div className="flex items-center gap-3">
                        <Calendar className="text-gray-400" size={20} />
                        <select
                            value={selectedPeriod}
                            onChange={(e) => setSelectedPeriod(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-[#111827]"
                        >
                            <option value="month">Ce mois</option>
                            <option value="quarter">3 derniers mois</option>
                            <option value="year">Année en cours (2026)</option>
                            <option value="custom">Personnalisé</option>
                        </select>
                    </div>

                    {/* Export Buttons */}
                    <div className="flex items-center gap-3">
                        <DocButton
                            label="Télécharger PDF"
                            icon={FileText}
                            onClick={handleExportPDF}
                            variant="primary"
                        />
                        <DocButton
                            label="Exporter Excel"
                            icon={FileDown}
                            onClick={handleExportExcel}
                            variant="outline"
                        />
                    </div>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-sm">
                    <p className="text-sm text-gray-600 mb-2">Total Loyers Perçus</p>
                    <p className="text-2xl font-bold text-green-600">
                        {formatAmount(totals.totalRevenue)} <span className="text-sm text-gray-500">FCFA</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Sur 12 mois</p>
                </div>

                <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-sm">
                    <p className="text-sm text-gray-600 mb-2">Total Charges</p>
                    <p className="text-2xl font-bold text-red-600">
                        {formatAmount(totals.totalCharges)} <span className="text-sm text-gray-500">FCFA</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Sur 12 mois</p>
                </div>

                <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-sm">
                    <p className="text-sm text-gray-600 mb-2">Frais de Gestion WCP</p>
                    <p className="text-2xl font-bold text-orange-600">
                        {formatAmount(totals.managementFees)} <span className="text-sm text-gray-500">FCFA</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">10% des revenus</p>
                </div>

                <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-sm">
                    <p className="text-sm text-gray-600 mb-2">Bénéfice Net</p>
                    <p className="text-2xl font-bold text-[#1E3A8A]">
                        {formatAmount(totals.totalNet)} <span className="text-sm text-gray-500">FCFA</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Après toutes charges</p>
                </div>
            </div>

            {/* Revenue Evolution Chart */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-sm">
                <h3 className="text-xl font-bold text-[#111827] mb-6">
                    Évolution Mensuelle
                </h3>
                <MonthlyRevenueChart
                    data={financialSummary.yearlyRevenue}
                    height={400}
                />
            </div>

            {/* Detailed Monthly Table */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden shadow-sm">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-xl font-bold text-[#111827]">
                        Détail Mensuel
                    </h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Mois
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Loyers
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Charges
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Frais Gestion (10%)
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Net
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {financialSummary.yearlyRevenue.map((month, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-semibold text-[#111827]">
                                        {month.month}
                                    </td>
                                    <td className="px-6 py-4 text-right font-semibold text-green-600">
                                        {formatAmount(month.revenue)} FCFA
                                    </td>
                                    <td className="px-6 py-4 text-right text-red-600">
                                        {formatAmount(month.charges)} FCFA
                                    </td>
                                    <td className="px-6 py-4 text-right text-orange-600">
                                        {formatAmount(month.revenue * 0.1)} FCFA
                                    </td>
                                    <td className="px-6 py-4 text-right font-bold text-[#1E3A8A]">
                                        {formatAmount(month.net)} FCFA
                                    </td>
                                </tr>
                            ))}
                            {/* Total Row */}
                            <tr className="bg-gray-100 font-bold">
                                <td className="px-6 py-4 text-[#111827]">
                                    TOTAL ANNUEL
                                </td>
                                <td className="px-6 py-4 text-right text-green-600">
                                    {formatAmount(totals.totalRevenue)} FCFA
                                </td>
                                <td className="px-6 py-4 text-right text-red-600">
                                    {formatAmount(totals.totalCharges)} FCFA
                                </td>
                                <td className="px-6 py-4 text-right text-orange-600">
                                    {formatAmount(totals.managementFees)} FCFA
                                </td>
                                <td className="px-6 py-4 text-right text-[#1E3A8A]">
                                    {formatAmount(totals.totalNet)} FCFA
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Tax Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                    <FileText className="text-[#1E3A8A] flex-shrink-0 mt-1" size={24} />
                    <div>
                        <h4 className="font-semibold text-[#1E3A8A] mb-2">
                            Données pour Déclaration Fiscale
                        </h4>
                        <p className="text-sm text-blue-900">
                            Les rapports exportés contiennent toutes les informations nécessaires pour votre déclaration fiscale annuelle.
                            Consultez votre expert-comptable pour plus de détails.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OwnerFinancialReports;
