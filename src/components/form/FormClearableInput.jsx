import { IconClose } from '../../constants/icons';

const FormClearableInput = ({label, inputs}) => {
  return (
    <div className="Form FormClearableInput">
      <label className="Form__label">{label}</label>
      <div className="FormClearableInput__inputs">
        <div className="FormClearableInput__input">
          <div className="Form__input-holder">
            <input 
              type="text" 
              name="test"
              className="Form__input"
              value="Test"
              onChange={() => {}}
            />
            {/* {error && <span className="Form__error">{error}</span>} */}
          </div>
          <button type="button" className="FormClearableInput__input-remove">
            <IconClose />
          </button>
        </div>
      </div>
    </div>
  )
}

export default FormClearableInput;