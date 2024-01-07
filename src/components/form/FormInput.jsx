const FormInput = ({type = 'text', name, label, value, error, handleChange}) => {
  return (
    <div className="Form FormInput">
      <label className="Form__label">{label}</label>
      <div className="Form__input-holder Form__input-error">
        <input 
          type={type}
          name={name}
          className="Form__input"
          value={value}
          onChange={handleChange}
        />
        {error && <span className="Form__error">{error}</span>}
      </div>
    </div>
  )
}

export default FormInput;