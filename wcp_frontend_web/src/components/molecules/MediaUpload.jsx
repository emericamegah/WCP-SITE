import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Upload, X, FileText, Image as ImageIcon, FileCheck, AlertCircle } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

/**
 * MediaUpload Component
 * Specialized for West Coast Property: Photos, PDF receipts, RIB, and ID documents.
 */
const MediaUpload = ({
    accept = "image/*,application/pdf",
    multiple = true,
    maxSize = 10 * 1024 * 1024, // 10MB default
    onFilesChange,
    className = '',
    label = "Documents & Médias",
    type = "general" // "photos", "docs", "rib", "general"
}) => {
    const [files, setFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState('');

    const validateFile = (file) => {
        if (file.size > maxSize) {
            setError(`Le fichier ${file.name} est trop volumineux (max ${maxSize / 1024 / 1024}MB)`);
            return false;
        }
        return true;
    };

    const handleFiles = useCallback((newFiles) => {
        const fileList = Array.from(newFiles);
        const validFiles = fileList.filter(validateFile);

        if (validFiles.length < fileList.length) {
            // Some files were rejected
            // setError is already set in validateFile for the first one, 
            // but we could improve this to show multiple errors.
        } else {
            setError('');
        }

        const filesWithPreview = validFiles.map(file => ({
            file,
            preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
            id: Math.random().toString(36).substr(2, 9),
            type: file.type
        }));

        const updatedFiles = multiple ? [...files, ...filesWithPreview] : filesWithPreview;
        setFiles(updatedFiles);

        if (onFilesChange) {
            onFilesChange(updatedFiles.map(f => f.file));
        }
    }, [files, multiple, onFilesChange, maxSize]);

    const onDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
    }, [handleFiles]);

    const removeFile = (id) => {
        const fileToRemove = files.find(f => f.id === id);
        if (fileToRemove?.preview) {
            URL.revokeObjectURL(fileToRemove.preview);
        }

        const updatedFiles = files.filter(f => f.id !== id);
        setFiles(updatedFiles);

        if (onFilesChange) {
            onFilesChange(updatedFiles.map(f => f.file));
        }
    };

    const getIcon = (fileObj) => {
        if (fileObj.type.startsWith('image/')) return <ImageIcon className="text-blue-500" size={24} />;
        if (fileObj.type === 'application/pdf') return <FileText className="text-red-500" size={24} />;
        return <FileCheck className="text-green-500" size={24} />;
    };

    const getHelperText = () => {
        switch (type) {
            case 'photos': return "Photos du bien (JPG, PNG)";
            case 'rib': return "RIB au format PDF ou Image";
            case 'docs': return "Documents justificatifs (PDF)";
            default: return "Images ou PDF";
        }
    };

    return (
        <div className={twMerge("w-full", className)}>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
                {label}
            </label>

            <div
                onDrop={onDrop}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                className={twMerge(
                    "relative border-2 border-dashed rounded-xl p-6 transition-all duration-300 flex flex-col items-center justify-center min-h-[160px]",
                    isDragging
                        ? "border-primary bg-primary/5 scale-[1.01]"
                        : "border-slate-200 hover:border-primary/50 hover:bg-slate-50/50"
                )}
            >
                <input
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={(e) => handleFiles(e.target.files)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />

                <div className="bg-slate-100 p-3 rounded-full mb-3">
                    <Upload className="text-slate-500" size={24} />
                </div>

                <p className="text-sm font-medium text-slate-800">
                    Glissez vos fichiers ici ou <span className="text-primary hover:underline">parcourez</span>
                </p>
                <p className="text-xs text-slate-500 mt-1">
                    {getHelperText()} • Max {maxSize / 1024 / 1024} Mo
                </p>
            </div>

            {error && (
                <div className="mt-3 flex items-center gap-2 text-danger text-sm bg-danger/5 p-3 rounded-lg animate-in">
                    <AlertCircle size={16} />
                    <span>{error}</span>
                </div>
            )}

            {files.length > 0 && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {files.map((fileObj) => (
                        <div
                            key={fileObj.id}
                            className="group relative flex items-center p-3 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                        >
                            <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center overflow-hidden flex-shrink-0">
                                {fileObj.preview ? (
                                    <img src={fileObj.preview} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    getIcon(fileObj)
                                )}
                            </div>

                            <div className="ml-3 flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-800 truncate">
                                    {fileObj.file.name}
                                </p>
                                <p className="text-xs text-slate-500">
                                    {(fileObj.file.size / 1024).toFixed(1)} KB
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => removeFile(fileObj.id)}
                                className="p-1.5 text-slate-400 hover:text-danger hover:bg-danger/5 rounded-lg transition-colors"
                                title="Supprimer"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

MediaUpload.propTypes = {
    accept: PropTypes.string,
    multiple: PropTypes.bool,
    maxSize: PropTypes.number,
    onFilesChange: PropTypes.func,
    className: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.oneOf(['photos', 'docs', 'rib', 'general'])
};

export default MediaUpload;
