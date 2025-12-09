import React from 'react';

/**
 * Composant Atome: Checkbox
 * Gère une case à cocher simple.
 */
const Checkbox = ({
  name,
  checked,
  onChange,
  id,
  ...rest 
}) => {
  const baseClass = "wcp-checkbox";
  
  return (
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      id={id}
      className={baseClass}
      {...rest}
    />
  );
};

export default Checkbox;