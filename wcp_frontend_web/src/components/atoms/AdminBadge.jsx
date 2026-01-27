import React from 'react';
import { Badge } from '../ui/badge';

const roleColors = {
    admin: 'bg-red-500 hover:bg-red-600 border-transparent text-white',
    agent: 'bg-blue-500 hover:bg-blue-600 border-transparent text-white', // agent = chargé d'affaires
    apporteur: 'bg-purple-500 hover:bg-purple-600 border-transparent text-white',
    tenant: 'bg-slate-500 hover:bg-slate-600 border-transparent text-white',
    owner: 'bg-emerald-500 hover:bg-emerald-600 border-transparent text-white',
};

const roleLabels = {
    admin: 'Admin',
    agent: 'Chargé d\'affaires',
    apporteur: 'Apporteur',
    tenant: 'Locataire',
    owner: 'Propriétaire',
};

const AdminBadge = ({ role }) => {
    const normalizedRole = role?.toLowerCase().replace(' ', '_') || 'client';
    const colorClass = roleColors[normalizedRole] || roleColors.client;
    const label = roleLabels[normalizedRole] || role;

    return (
        <Badge className={`${colorClass} shadow-sm`}>
            {label}
        </Badge>
    );
};

export default AdminBadge;
