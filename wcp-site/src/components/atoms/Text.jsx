import React from 'react';

/**
 *
 * @param {string} type - Le type d'input (text, email, password, number, etc.).
 * @param {string} placeholder - Texte indicatif.
 * @param {boolean} hasError - Indique un état d'erreur.
 * @param {string} value - La valeur contrôlée.
 * @param {function} onChange - Le gestionnaire de changement.
 */
const InputText = ({
  type = 'text',
  placeholder,
  hasError = false,
  value,
  onChange,
  ...rest
}) => {
  const baseClass = "wcp-input";

  const errorClass = hasError ? "wcp-input--error" : "";

  const classes = `${baseClass} ${errorClass}`.trim();

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={classes}
      {...rest}
    />
  );
};

export default InputText;