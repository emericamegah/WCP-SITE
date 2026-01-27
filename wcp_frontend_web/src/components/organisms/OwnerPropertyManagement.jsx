import React, { useState } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import PropertyMiniature from '../molecules/PropertyMiniature';
import PropertyStatus from '../atoms/PropertyStatus';
import TenantCard from '../molecules/TenantCard';
import { ownerProperties } from '../../api/ownerMockData';

const OwnerPropertyManagement = () => {
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedProperty, setSelectedProperty] = useState(null);

    // Filter properties
    const filteredProperties = ownerProperties.filter(property => {
        const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.address.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const formatAmount = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

    const handleManageProperty = (property) => {
        setSelectedProperty(property);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold text-[#111827] mb-2">
                    Mes Biens
                </h2>
                <p className="text-gray-600">
                    Gérez l'ensemble de votre patrimoine immobilier
                </p>
            </div>

            {/* Filters & View Toggles */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-4">
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    {/* Search */}
                    <div className="relative flex-1 w-full md:max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Rechercher un bien..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Filters & View */}
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        {/* Status Filter */}
                        <div className="flex items-center gap-2 flex-1 md:flex-initial">
                            <Filter className="text-gray-400" size={20} />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="flex-1 md:flex-initial px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            >
                                <option value="all">Tous les statuts</option>
                                <option value="loué">Loués</option>
                                <option value="vacant">Vacants</option>
                                <option value="maintenance">En maintenance</option>
                            </select>
                        </div>

                        {/* View Toggle */}
                        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                            >
                                <Grid size={18} className={viewMode === 'grid' ? 'text-[#1E3A8A]' : 'text-gray-600'} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                            >
                                <List size={18} className={viewMode === 'list' ? 'text-[#1E3A8A]' : 'text-gray-600'} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mt-3 text-sm text-gray-600">
                    {filteredProperties.length} bien{filteredProperties.length > 1 ? 's' : ''} trouvé{filteredProperties.length > 1 ? 's' : ''}
                </div>
            </div>

            {/* Properties Grid/List */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProperties.map(property => (
                        <PropertyMiniature
                            key={property.id}
                            property={property}
                            layout="vertical"
                            onManage={handleManageProperty}
                        />
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Bien
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Adresse
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Statut
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Locataire
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Loyer
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredProperties.map(property => (
                                    <tr key={property.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={property.image}
                                                    alt={property.title}
                                                    className="w-12 h-12 rounded-lg object-cover"
                                                />
                                                <div>
                                                    <p className="font-semibold text-[#111827] text-sm">
                                                        {property.title}
                                                    </p>
                                                    <p className="text-xs text-gray-600">
                                                        {property.type}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {property.address}
                                        </td>
                                        <td className="px-6 py-4">
                                            <PropertyStatus status={property.status} />
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {property.tenant ? property.tenant.name : '-'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-semibold text-[#1E3A8A]">
                                                {formatAmount(property.monthlyRent)}
                                            </p>
                                            <p className="text-xs text-gray-500">FCFA/mois</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleManageProperty(property)}
                                                className="text-sm font-semibold text-[#1E3A8A] hover:text-blue-700 transition-colors"
                                            >
                                                Gérer
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* No Results */}
            {filteredProperties.length === 0 && (
                <div className="bg-white rounded-xl border border-[#E5E7EB] p-12 text-center">
                    <p className="text-gray-600">
                        Aucun bien trouvé avec ces critères
                    </p>
                </div>
            )}

            {/* Property Detail Modal/Sidebar (simplified) */}
            {selectedProperty && selectedProperty.tenant && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl max-w-md w-full p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-[#111827]">
                                {selectedProperty.title}
                            </h3>
                            <button
                                onClick={() => setSelectedProperty(null)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                        <TenantCard
                            tenant={selectedProperty.tenant}
                            propertyAddress={selectedProperty.address}
                            onContact={() => alert(`Contacter ${selectedProperty.tenant.name}`)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default OwnerPropertyManagement;
