import React from 'react';
import { Badge } from '../ui/badge';
import { cn } from '../../lib/utils';

const statusConfig = {
    // Finance
    paid: { label: 'Payé', className: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200' },
    overdue: { label: 'En retard', className: 'bg-red-100 text-red-700 hover:bg-red-100 border-red-200' },
    pending: { label: 'En attente', className: 'bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200' },

    // Contracts
    active: { label: 'Actif', className: 'bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200' },
    expired: { label: 'Expiré', className: 'bg-gray-100 text-gray-700 hover:bg-gray-100 border-gray-200' },
    draft: { label: 'Brouillon', className: 'bg-slate-100 text-slate-700 hover:bg-slate-100 border-slate-200' },
};

const DataPill = ({ status, type = 'default' }) => {
    const config = statusConfig[status?.toLowerCase()] || { label: status, className: 'bg-gray-100 text-gray-800' };

    return (
        <Badge variant="outline" className={cn("font-medium", config.className)}>
            {config.label}
        </Badge>
    );
};

export default DataPill;
