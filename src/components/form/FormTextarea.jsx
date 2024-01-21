const FormTextarea = ({data, handleChange}) => {
  const {label, value} = data;
  
  return (
    <div className="Form FormInput">
      <label htmlFor={label} className="Form__label">{label}</label>
      <div className="Form__input-holder">
        <textarea 
          name={label}
          id={label}
          className="Form__textarea"
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default FormTextarea;