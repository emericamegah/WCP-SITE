import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../atoms/Icon';

const PDFDownloader = ({ onDownload }) => {
    return (
        <div
            className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer hover:bg-wcp-blue-50 hover:border-wcp-blue-200 transition-colors group"
            onClick={onDownload}
        >
            <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-md shadow-sm text-gray-400 group-hover:text-wcp-blue-600 transition-colors">
                    <Icon name="FileText" size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-gray-900">Brochure Commerciale</h4>
                    <p className="text-sm text-gray-500">Téléchargez le PDF complet du bien</p>
                </div>
            </div>
            <div className="text-gray-400 group-hover:text-wcp-blue-600 transition-colors">
                <Icon name="Download" size={20} />
            </div>
        </div>
    );
};

PDFDownloader.propTypes = {
    onDownload: PropTypes.func.isRequired,
};

export default PDFDownloader;
