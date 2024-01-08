const FormInput = ({type = 'text', name, label, value, error, handleChange}) => {
  return (
    <div className="Form FormInput">
      <label htmlFor={name} className="Form__label">{label}</label>
      <div className={error ? 'Form__input-holder Form__input-error' : 'Form__input-holder'}>
        <input 
          type={type}
          name={name}
          id={name}
          className="Form__input"
          value={value}
          autoComplete={name}
          onChange={handleChange}
        />
        {error && <span className="Form__error">{error}</span>}
      </div>
    </div>
  )
}

export default FormInput;