import React from 'react';
import { Badge } from '../ui/badge';
import PropTypes from 'prop-types';

const statusMap = {
    pending: { variant: 'warning', label: 'En attente' },
    validated: { variant: 'success', label: 'Validé' },
    rejected: { variant: 'destructive', label: 'Rejeté' },
    processing: { variant: 'secondary', label: 'En cours' },
    default: { variant: 'outline', label: 'Inconnu' }
};

const StatusPill = ({ status }) => {
    const config = statusMap[status] || statusMap.default;
    return (
        <Badge variant={config.variant}>
            {config.label}
        </Badge>
    );
};

StatusPill.propTypes = {
    status: PropTypes.string.isRequired,
};

export default StatusPill;
