const FormTextarea = ({name, label, value, handleChange}) => {
  return (
    <div className="Form FormInput">
      <label className="Form__label">{label}</label>
      <div className="Form__input-holder">
        <textarea 
          name={name}
          className="Form__textarea"
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default FormTextarea;