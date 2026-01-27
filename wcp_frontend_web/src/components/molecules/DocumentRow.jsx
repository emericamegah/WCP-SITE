import React from 'react';
import PropTypes from 'prop-types';
import FileIcon from '../atoms/FileIcon';
import WCPButton from '../atoms/WCPButton';
import { Download } from 'lucide-react';

const DocumentRow = ({ name, date, type, onDownload, className = '' }) => {
    const formattedDate = new Date(date).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    return (
        <div className={`flex items-center justify-between p-4 bg-white border-b border-gray-100 last:border-0 hover:bg-slate-50 transition-colors ${className}`}>
            <div className="flex items-center space-x-4">
                <FileIcon type={type} size={32} />
                <div>
                    <p className="text-sm font-semibold text-gray-900">{name}</p>
                    <p className="text-xs text-gray-500">Ajouté le {formattedDate}</p>
                </div>
            </div>
            <WCPButton
                variant="ghost"
                onClick={onDownload}
                className="text-wcp-blue-600 hover:text-wcp-blue-700"
            >
                <Download size={18} className="mr-2" />
                Télécharger
            </WCPButton>
        </div>
    );
};

DocumentRow.propTypes = {
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onDownload: PropTypes.func.isRequired,
    className: PropTypes.string,
};

export default DocumentRow;
