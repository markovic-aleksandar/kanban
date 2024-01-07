const FormCheckbox = ({label, checkboxes}) => {
  return (
    <div className="Form FormCheckbox">
      <label className="Form__label">{label}</label>
      <div className="FormCheckbox__checkboxes">
        <label className="FormCheckbox__checkbox">
          <input 
            type="checkbox" 
            className="FormCheckbox__input"  
          />
          Sign in page
        </label>
      </div>
    </div>
  )
}

export default FormCheckbox;