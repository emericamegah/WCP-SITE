import React from 'react';
import './SelectField.css'; 

/**
 * Composant Atome: SelectField
 * * @param {string} name - Nom pour la gestion du formulaire (ex: 'typeDeBien').
 * @param {string} value - La valeur sélectionnée actuelle (contrôlée).
 * @param {function} onChange - Gestionnaire de changement de valeur.
 * @param {boolean} hasError - Indicateur d'état d'erreur.
 * @param {Array<Object>} options - Liste des options [{ value: string, label: string }].
 * @param {boolean} required - Indique si le champ est obligatoire (pour l'accessibilité).
 */
const SelectField = ({
  name,
  value,
  onChange,
  hasError = false,
  options = [],
  required = false,
  ...rest 
}) => {
  const baseClass = "wcp-select";
  const errorClass = hasError ? "wcp-select--error" : "";

  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`${baseClass} ${errorClass}`.trim()}
      aria-invalid={hasError ? "true" : "false"}
      required={required}
      {...rest}
    >
      {/* Option par défaut/placeholder : elle doit être désactivée si le champ est requis */}
      <option value="" disabled={required}>
        Sélectionnez une option...
      </option>

      {/* Rendu des options fournies */}
      {options.map((option) => (
        <option 
          key={option.value} 
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectField;