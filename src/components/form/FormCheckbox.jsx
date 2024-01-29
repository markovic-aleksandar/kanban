import { formatListOption } from "../../utils";

const FormCheckbox = ({label, options, handleChange}) => {
  const checkboxOptions = options.map(option => formatListOption(option));
  const checkboxCompletedOptions = checkboxOptions.filter(checkboxOption => checkboxOption.complete);

  return (
    <div className="Form FormCheckbox">
      <label className="Form__label">{`Subtasks (${checkboxCompletedOptions.length} of ${checkboxOptions.length})`}</label>
      <div className="FormCheckbox__checkboxes">
        {checkboxOptions.map((checkbox, index) => {
          return (
            <label 
              key={checkbox.key} 
              className={checkbox.complete ? 'FormCheckbox__checkbox FormCheckbox__checkbox-checked' : 'FormCheckbox__checkbox'}
            >
              <input 
                type="checkbox" 
                className="FormCheckbox__input"
                checked={checkbox.complete}
                onChange={e => handleChange({name: label, value: e.target.checked, index})}
              />
              {checkbox.label}
            </label>
          )
        })}
      </div>
    </div>
  )
}

export default FormCheckbox;