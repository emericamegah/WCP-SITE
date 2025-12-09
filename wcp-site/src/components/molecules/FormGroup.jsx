import React from 'react';
import Label from '../atoms/Label';

const FormGroup = ({
  id,
  labelText,
  required = false,
  errorMessage = '',
  children,
}) => {
  const baseClass = "wcp-form-group";
  const errorClass = errorMessage ? "wcp-form-group--error" : "";

  return (
    <div className={`${baseClass} ${errorClass}`.trim()}>

      <Label htmlFor={id} required={required}>
        {labelText}
      </Label>

      {/* Gestion de plusieurs enfants */}
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;

        const isFormField =
            child.type === 'input' ||
            child.type === 'select' ||
            child.type === 'textarea' ||
            child.props.type === 'file';

        return React.cloneElement(child, {
            ...(isFormField ? { id } : {}),  
            ...(errorMessage ? { hasError: true } : {}),
        });
        })}


      {errorMessage && (
        <p className="wcp-form-group__error-message" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default FormGroup;
