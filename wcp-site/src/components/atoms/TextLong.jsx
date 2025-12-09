import React from 'react';

/**
 * Composant Atome: TextArea
 * Gère la saisie de texte multiligne (Message, Description).
 */
const TextArea = ({
  name,
  value,
  onChange,
  hasError = false,
  placeholder = '',
  rows = 5,
  ...rest 
}) => {
  const baseClass = "wcp-textarea";
  const errorClass = hasError ? "wcp-textarea--error" : "";

  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`${baseClass} ${errorClass}`.trim()}
      aria-invalid={hasError ? "true" : "false"}
      {...rest}
    />
  );
};

export default TextArea;