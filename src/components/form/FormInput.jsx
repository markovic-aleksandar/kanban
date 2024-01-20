import { useEffect, useRef } from 'react';

const FormInput = ({type = 'text', data, handleChange}) => {
  const {label, value, error, isFocusable, isDisabled} = data;
  const inputRef = useRef(null);
  
  // add focus on input if prop isFocus is true
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <div className="Form FormInput">
      <label htmlFor={label} className="Form__label">{label}</label>
      <div 
        className={
          isDisabled ? 'Form__input-holder Form__input-disabled' :  
          error ? 'Form__input-holder Form__input-error' : 
          'Form__input-holder'
        }  
      >
        <input
          ref={isFocusable ? inputRef : null}
          type={type}
          name={label}
          id={label}
          className="Form__input"
          value={value}
          autoComplete={label}
          disabled={isDisabled || null}
          onChange={!isDisabled ? handleChange : null}
        />
        {error && <span className="Form__error">{error}</span>}
      </div>
    </div>
  )
}

export default FormInput;