import React from 'react';
import PropTypes from 'prop-types';

const StatusBadge = ({ status, className = '' }) => {
    const getStatusStyles = () => {
        switch (status?.toLowerCase()) {
            case 'paid':
            case 'resolved':
            case 'success':
                return 'text-green-600 bg-green-50 border-green-100';
            case 'pending':
            case 'in progress':
            case 'waiting':
                return 'text-orange-500 bg-orange-50 border-orange-100';
            case 'overdue':
            case 'danger':
            case 'failed':
            case 'open':
                return 'text-red-600 bg-red-50 border-red-100';
            default:
                return 'text-gray-600 bg-gray-50 border-gray-100';
        }
    };

    const getStatusLabel = () => {
        switch (status?.toLowerCase()) {
            case 'paid': return 'Payé';
            case 'pending': return 'En attente';
            case 'overdue': return 'Retard';
            case 'resolved': return 'Résolu';
            case 'in progress': return 'En cours';
            case 'open': return 'Ouvert';
            default: return status;
        }
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyles()} ${className}`}>
            {getStatusLabel()}
        </span>
    );
};

StatusBadge.propTypes = {
    status: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default StatusBadge;
