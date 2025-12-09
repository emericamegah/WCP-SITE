import React from 'react';

export const InputFile = ({ 
    accept = 'image/*, video/*, .pdf, .doc, .docx',
    multiple = false,
    className = 'wcp-input-file', 
    ...props 
}) => {
  return (
    <input
      type="file"
      className={className}
      accept={accept}
      multiple={multiple}
      {...props}
    />
  );
};