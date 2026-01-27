import React from 'react';
import PropTypes from 'prop-types';
import StatusBadge from '../atoms/StatusBadge';
import { MessageSquare, Calendar } from 'lucide-react';

const MaintenanceTicket = ({ subject, description, date, status, className = '' }) => {
    const formattedDate = new Date(date).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className={`bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow ${className}`}>
            <div className="flex justify-between items-start mb-3">
                <h4 className="text-base font-bold text-gray-900 flex-1 mr-4">{subject}</h4>
                <StatusBadge status={status} />
            </div>

            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-50 text-xs text-gray-500">
                <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {formattedDate}
                </div>
                <div className="flex items-center">
                    <MessageSquare size={14} className="mr-1" />
                    ID: {Math.random().toString(36).substr(2, 6).toUpperCase()}
                </div>
            </div>
        </div>
    );
};

MaintenanceTicket.propTypes = {
    subject: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default MaintenanceTicket;
