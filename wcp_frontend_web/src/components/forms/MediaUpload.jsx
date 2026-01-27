import React, { useState } from 'react';
import { Upload, X, FileText, Image as ImageIcon } from 'lucide-react';
import { Button } from '../ui/button';

const MediaUpload = ({ label, onUploadSuccess, accept = "*", multiple = false }) => {
    const [files, setFiles] = useState([]);

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files).map(file => ({
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            type: file.type,
            url: URL.createObjectURL(file)
        }));

        const updatedFiles = multiple ? [...files, ...newFiles] : newFiles;
        setFiles(updatedFiles);

        // Simulating upload success
        if (onUploadSuccess) {
            newFiles.forEach(f => onUploadSuccess(f.url));
        }
    };

    const removeFile = (id) => {
        setFiles(files.filter(f => f.id !== id));
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-200 border-dashed rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-3 text-slate-400" />
                        <p className="mb-2 text-sm text-slate-500"><span className="font-semibold">{label || 'Cliquez pour uploader'}</span></p>
                        <p className="text-xs text-slate-400">PDF, JPG, PNG (Max. 10MB)</p>
                    </div>
                    <input
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept={accept}
                        multiple={multiple}
                    />
                </label>
            </div>

            {files.length > 0 && (
                <div className="grid grid-cols-1 gap-2">
                    {files.map(file => (
                        <div key={file.id} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl">
                            <div className="flex items-center gap-3">
                                {file.type.includes('image') ? <ImageIcon size={18} className="text-primary" /> : <FileText size={18} className="text-primary" />}
                                <span className="text-xs font-medium text-slate-700 truncate max-w-[200px]">{file.name}</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => removeFile(file.id)}
                                className="p-1 hover:bg-red-50 hover:text-red-500 rounded-md transition-colors"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MediaUpload;
