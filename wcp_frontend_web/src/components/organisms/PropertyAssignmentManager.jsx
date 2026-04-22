import React, { useState } from 'react';
import { Building2, Users, UserPlus, UserMinus, Edit2, Eye } from 'lucide-react';
import { owners } from '../../api/propertyAssignments';
import {
    getPropertiesByOwner,
    assignPropertyToOwner,
    evictTenant,
    getOwnerStats
} from '../../api/services/assignmentService';
import StatusPill from '../atoms/StatusPill';
import WCPButton from '../atoms/WCPButton';
import Icon from '../atoms/Icon';
import AssignTenantModal from './AssignTenantModal';

const PropertyAssignmentManager = () => {
    const [selectedOwner, setSelectedOwner] = useState(1);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const ownerProperties = getPropertiesByOwner(selectedOwner);
    const stats = getOwnerStats(selectedOwner);

    const handleAssignTenant = (property) => {
        setSelectedProperty(property);
        setShowAssignModal(true);
    };

    const handleEvictTenant = (property) => {
        if (!window.confirm(`Êtes-vous sûr de vouloir libérer ce bien?\n\nBien: ${property.title}\nLocataire: ${property.tenant?.firstName} ${property.tenant?.lastName}`)) {
            return;
        }

        try {
            evictTenant(property.id, property.tenant.id, 'Libération manuelle par admin');
            alert('✅ Bien libéré avec succès!');
            setRefreshKey(prev => prev + 1); // Force refresh
        } catch (error) {
            alert(`❌ Erreur: ${error.message}`);
        }
    };

    const handleChangeOwner = (propertyId) => {
        const newOwnerId = prompt('Entrez l\'ID du nouveau propriétaire:');
        if (!newOwnerId) return;

        try {
            assignPropertyToOwner(propertyId, parseInt(newOwnerId));
            alert('✅ Propriétaire changé avec succès!');
            setRefreshKey(prev => prev + 1);
        } catch (error) {
            alert(`❌ Erreur: ${error.message}`);
        }
    };



    return (
        <div className="space-y-6" key={refreshKey}>
            {/* Header & Owner Selection */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Gestion des Assignements</h1>
                    <p className="text-slate-600 mt-1">Gérez les relations propriétaires-biens-locataires</p>
                </div>

                <div className="flex items-center gap-3">
                    <label className="text-sm font-medium text-slate-700">Propriétaire:</label>
                    <select
                        value={selectedOwner}
                        onChange={(e) => setSelectedOwner(parseInt(e.target.value))}
                        className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                        {owners.map(owner => (
                            <option key={owner.id} value={owner.id}>
                                {owner.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-slate-600 text-sm font-medium">Total Biens</p>
                        <Building2 className="text-blue-600" size={20} />
                    </div>
                    <p className="text-2xl font-bold text-slate-900">{stats.totalProperties}</p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-slate-600 text-sm font-medium">Occupés</p>
                        <Users className="text-green-600" size={20} />
                    </div>
                    <p className="text-2xl font-bold text-green-600">{stats.occupiedProperties}</p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-slate-600 text-sm font-medium">Vacants</p>
                        <Building2 className="text-orange-600" size={20} />
                    </div>
                    <p className="text-2xl font-bold text-orange-600">{stats.vacantProperties}</p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-slate-600 text-sm font-medium">Taux d'Occupation</p>
                        <Icon name="TrendingUp" className="text-purple-600" size={20} />
                    </div>
                    <p className="text-2xl font-bold text-purple-600">{stats.occupancyRate}</p>
                </div>
            </div>

            {/* Properties Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-200">
                    <h2 className="text-xl font-bold text-slate-900">Biens de {owners.find(o => o.id === selectedOwner)?.name}</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Bien</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Loyer</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Statut</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Locataire</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Bail</th>
                                <th className="px-6 py-3 text-right text-xs font-bold text-slate-700 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            {ownerProperties.map((property) => {
                                return (
                                    <tr key={property.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-semibold text-slate-900">{property.title}</p>
                                                <p className="text-sm text-slate-600">{property.address}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm text-slate-600 capitalize">{property.type}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm font-medium text-slate-900">
                                                {property.monthlyRent.toLocaleString()} FCFA
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <StatusPill status={property.assignment.status} />
                                        </td>
                                        <td className="px-6 py-4">
                                            {property.tenant ? (
                                                <div>
                                                    <p className="text-sm font-medium text-slate-900">
                                                        {property.tenant.firstName} {property.tenant.lastName}
                                                    </p>
                                                    <p className="text-xs text-slate-600">{property.tenant.email}</p>
                                                </div>
                                            ) : (
                                                <span className="text-sm text-slate-400 italic">Aucun</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {property.lease ? (
                                                <div className="text-sm">
                                                    <p className="text-slate-900">
                                                        {new Date(property.lease.startDate).toLocaleDateString('fr-FR')}
                                                    </p>
                                                    <p className="text-slate-600">
                                                        → {new Date(property.lease.endDate).toLocaleDateString('fr-FR')}
                                                    </p>
                                                </div>
                                            ) : (
                                                <span className="text-sm text-slate-400 italic">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {property.assignment.status === 'vacant' ? (
                                                    <WCPButton
                                                        onClick={() => handleAssignTenant(property)}
                                                        variant="primary"
                                                        className="bg-green-600 hover:bg-green-700 text-xs"
                                                    >
                                                        <UserPlus size={14} className="mr-1" />
                                                        Assigner
                                                    </WCPButton>
                                                ) : (
                                                    <WCPButton
                                                        onClick={() => handleEvictTenant(property)}
                                                        variant="outline"
                                                        className="border-red-600 text-red-600 hover:bg-red-50 text-xs"
                                                    >
                                                        <UserMinus size={14} className="mr-1" />
                                                        Libérer
                                                    </WCPButton>
                                                )}

                                                <button
                                                    onClick={() => handleChangeOwner(property.id)}
                                                    className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                                    title="Changer de propriétaire"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {ownerProperties.length === 0 && (
                        <div className="p-12 text-center text-slate-500">
                            <Building2 size={48} className="mx-auto mb-4 text-slate-300" />
                            <p className="text-lg font-semibold">Aucun bien pour ce propriétaire</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Assign Tenant Modal */}
            {showAssignModal && selectedProperty && (
                <AssignTenantModal
                    property={selectedProperty}
                    onClose={() => {
                        setShowAssignModal(false);
                        setSelectedProperty(null);
                    }}
                    onSuccess={() => {
                        setRefreshKey(prev => prev + 1);
                    }}
                />
            )}
        </div>
    );
};

export default PropertyAssignmentManager;
