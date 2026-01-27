import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Upload } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const WCPFilePicker = React.forwardRef(({ className, label, error, onChange, ...props }, ref) => {
    const [fileName, setFileName] = useState(null);
    const internalRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
        } else {
            setFileName(null);
        }
        if (onChange) onChange(e);
    };

    return (
        <div className={twMerge("w-full", className)}>
            <div
                className={clsx(
                    "relative flex items-center justify-center w-full px-4 py-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
                    error
                        ? "border-red-300 bg-red-50 hover:bg-red-100"
                        : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                )}
                onClick={() => internalRef.current?.click()}
            >
                <input
                    type="file"
                    className="hidden"
                    ref={(e) => {
                        internalRef.current = e;
                        if (typeof ref === 'function') ref(e);
                        else if (ref) ref.current = e;
                    }}
                    onChange={handleFileChange}
                    {...props}
                />

                <div className="text-center">
                    <Upload className={clsx("w-8 h-8 mx-auto mb-2", error ? "text-red-400" : "text-gray-400")} />
                    {fileName ? (
                        <p className="text-sm font-medium text-wcp-blue-600 truncate max-w-[200px] mx-auto">{fileName}</p>
                    ) : (
                        <>
                            <p className="text-sm font-medium text-gray-700">{label || "Cliquez pour uploader un fichier"}</p>
                            <p className="text-xs text-gray-500 mt-1">PDF, DOC, JPG (Max 5Mo)</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
});

WCPFilePicker.displayName = 'WCPFilePicker';

WCPFilePicker.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    error: PropTypes.bool,
    onChange: PropTypes.func,
};

export default WCPFilePicker;
