import React from 'react';
import PropTypes from 'prop-types';
import { FileText, File, FileCode } from 'lucide-react';

const FileIcon = ({ type, size = 24, className = '' }) => {
    const getIcon = () => {
        switch (type?.toLowerCase()) {
            case 'pdf':
                return <FileText size={size} className={`text-red-500 ${className}`} />;
            case 'doc':
            case 'docx':
                return <File size={size} className={`text-blue-500 ${className}`} />;
            case 'invoice':
            case 'receipt':
                return <FileCode size={size} className={`text-green-500 ${className}`} />;
            default:
                return <File size={size} className={`text-gray-400 ${className}`} />;
        }
    };

    return <div className="inline-flex items-center justify-center">{getIcon()}</div>;
};

FileIcon.propTypes = {
    type: PropTypes.string.isRequired,
    size: PropTypes.number,
    className: PropTypes.string,
};

export default FileIcon;
