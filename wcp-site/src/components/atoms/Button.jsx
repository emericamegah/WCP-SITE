import React from 'react';
             
/**
 *
 * @param {string} variant - Le style visuel (primary, secondary, danger).
 * @param {string} size - La taille du bouton (sm, md, lg).
 * @param {boolean} disabled - Désactiver le bouton.
 * @param {boolean} isLoading - Afficher un état de chargement.
 * @param {function} onClick - Le gestionnaire de clic.
 * @param {React.ReactNode} children - Le contenu du bouton (texte, icône).
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  isLoading = false,
  onClick,
  children,
  ...rest
}) => {

  const baseClass = "wcp-button";

  const variantClass = `wcp-button--${variant}`;
  const sizeClass = `wcp-button--${size}`;
  
  const stateClass = (disabled || isLoading) ? "wcp-button--disabled" : "";

  const classes = `${baseClass} ${variantClass} ${sizeClass} ${stateClass}`.trim();

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={classes}
      type="button" 
      {...rest}
    >
      {isLoading ? (
        <span className="wcp-button__loader">⚙️</span> 
      ) : null}
      
      {children}
    </button>
  );
};

export default Button;