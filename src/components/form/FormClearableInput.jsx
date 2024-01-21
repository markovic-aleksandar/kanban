import { useEffect, useRef } from 'react';
import { ButtonIcon } from '../Button';
import { IconPlus, IconClose } from '../../constants/icons';

const FormClearableInput = ({data, maxDataLength, handleChange, handleAdd, handleRemove}) => {
  const {label, value: inputs, isFocusable} = data;
  const clearableInputsRef = useRef(null);

  // handle make focus on new created input
  useEffect(() => {
    if (inputs.length <= 1 || isFocusable !== 'inc') return;

    // set focus on new created input
    clearableInputsRef.current.querySelectorAll('input')[inputs.length - 1].focus();
  }, [inputs.length, isFocusable]);

  return (
    <div className="Form FormClearableInput">
      <label className="Form__label">{label}</label>
      <div ref={clearableInputsRef} className="FormClearableInput__inputs">
        {inputs.map((input, index) => {
          const {value, error} = input;
          return (
            <div 
              key={index} 
              className={error ? 'FormClearableInput__input Form__input-error' : 'FormClearableInput__input'}
            >
              <div className="Form__input-holder">
                <input 
                  type="text"
                  name={`${label}-${index}`}
                  className="Form__input"
                  value={value}
                  onChange={e => handleChange({name: label, value: e.target.value, index})}
                />
                {error && <span className="Form__error">{error}</span>}
              </div>
              {inputs.length > 1 && (
                <button 
                  type="button" 
                  className="FormClearableInput__input-remove"
                  onClick={() => handleRemove(label, index)}
                >
                  <IconClose />
                </button>)}
            </div>
          )
        })}
      </div>

      {inputs.length < maxDataLength && (
        <ButtonIcon 
          variant="FormClearableInput__input-add Button__small Button__full Button__light" 
          value={`Add New ${label}`}
          handleAction={() => handleAdd(label, maxDataLength)} 
        >
          <IconPlus />
        </ButtonIcon>
      )}
    </div>
  )
}

export default FormClearableInput;