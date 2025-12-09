import React from 'react';

/**
 *
 * @param {string} htmlFor - L'ID de l'élément de formulaire associé (très important).
 * @param {boolean} required - Indique si le champ est requis.
 * @param {React.ReactNode} children - Le contenu du label (texte).
 */
const Label = ({
  htmlFor,
  required = false,
  children,
  ...rest
}) => {
  const baseClass = "wcp-label"; 

  return (
    <label 
      htmlFor={htmlFor} 
      className={baseClass} 
      {...rest}
    >
      {children}
      {required && (
        <span className="wcp-label__required-indicator"> *</span>
      )}
    </label>
  );
};

export default Label;