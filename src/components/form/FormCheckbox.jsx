import { formatListOption } from "../../utils";

const FormCheckbox = ({label, options}) => {
  const checkboxOptions = options.map(option => formatListOption(option));

  return (
    <div className="Form FormCheckbox">
      <label className="Form__label">{label}</label>
      <div className="FormCheckbox__checkboxes">
        {checkboxOptions.map(checkbox => {
          const {label, value} = checkbox;
          return (
            <label key={value} className="FormCheckbox__checkbox">
              <input 
                type="checkbox" 
                className="FormCheckbox__input"  
              />
              {label}
            </label>
          )
        })}
      </div>
    </div>
  )
}

export default FormCheckbox;