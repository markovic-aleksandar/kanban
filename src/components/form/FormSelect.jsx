import Dropdown from '../Dropdown';

const FormSelect = ({label, value, options, handleChange}) => {
 
  // handle dropdown select change
  const handleDropdownSelectChange = option => {
    console.log(option);
    handleChange({name: label, value: option});
  }

  return (
    <div className="Form FormSelect">
      <label className="Form__label">{label}</label>
      <div className="Form__input-holder">
        <Dropdown 
          menuType="select"
          menuOptions={options}
          menuOption={value}
          menuTrigger={
            <div className="FormSelect__trigger" />
          }
          menuAction={handleDropdownSelectChange}
        />
      </div>
    </div>
  )
}

export default FormSelect;