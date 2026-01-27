import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Upload, X, FileImage, FileVideo } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const FileUpload = ({
    accept = "image/*",
    multiple = true,
    maxSize = 5 * 1024 * 1024, // 5MB default
    onChange,
    className = '',
    label = "Télécharger des fichiers"
}) => {
    const [files, setFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState('');

    const validateFile = (file) => {
        if (file.size > maxSize) {
            setError(`Le fichier ${file.name} est trop volumineux (max ${maxSize / 1024 / 1024}MB)`);
            return false;
        }
        setError('');
        return true;
    };

    const handleFiles = useCallback((newFiles) => {
        const validFiles = Array.from(newFiles).filter(validateFile);

        const filesWithPreview = validFiles.map(file => ({
            file,
            preview: URL.createObjectURL(file),
            id: Math.random().toString(36).substr(2, 9)
        }));

        const updatedFiles = multiple ? [...files, ...filesWithPreview] : filesWithPreview;
        setFiles(updatedFiles);

        if (onChange) {
            onChange(updatedFiles.map(f => f.file));
        }
    }, [files, multiple, onChange]);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFiles = e.dataTransfer.files;
        handleFiles(droppedFiles);
    }, [handleFiles]);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleFileInput = (e) => {
        handleFiles(e.target.files);
    };

    const removeFile = (id) => {
        const updatedFiles = files.filter(f => f.id !== id);
        setFiles(updatedFiles);
        if (onChange) {
            onChange(updatedFiles.map(f => f.file));
        }
    };

    const isImage = (file) => file.file.type.startsWith('image/');
    const isVideo = (file) => file.file.type.startsWith('video/');

    return (
        <div className={className}>
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={twMerge(
                    "relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200",
                    isDragging
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
                )}
            >
                <input
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={handleFileInput}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload className="mx-auto mb-4 text-gray-400" size={40} />
                <p className="text-sm font-medium text-gray-700 mb-1">
                    {label}
                </p>
                <p className="text-xs text-gray-500">
                    Glissez-déposez ou cliquez pour sélectionner
                </p>
                <p className="text-xs text-gray-400 mt-1">
                    Max {maxSize / 1024 / 1024}MB par fichier
                </p>
            </div>

            {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
            )}

            {files.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {files.map((fileObj) => (
                        <div key={fileObj.id} className="relative group">
                            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                                {isImage(fileObj) && (
                                    <img
                                        src={fileObj.preview}
                                        alt={fileObj.file.name}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                                {isVideo(fileObj) && (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-600">
                                        <FileVideo size={32} />
                                        <span className="text-xs mt-2">Vidéo</span>
                                    </div>
                                )}
                                {!isImage(fileObj) && !isVideo(fileObj) && (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-600">
                                        <FileImage size={32} />
                                        <span className="text-xs mt-2">Fichier</span>
                                    </div>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() => removeFile(fileObj.id)}
                                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                            >
                                <X size={16} />
                            </button>
                            <p className="mt-1 text-xs text-gray-600 truncate">
                                {fileObj.file.name}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

FileUpload.propTypes = {
    accept: PropTypes.string,
    multiple: PropTypes.bool,
    maxSize: PropTypes.number,
    onChange: PropTypes.func,
    className: PropTypes.string,
    label: PropTypes.string,
};

export default FileUpload;
