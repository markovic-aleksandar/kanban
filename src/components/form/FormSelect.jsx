import Dropdown from '../Dropdown';
import { formatDropdownOptions } from '../../utils';

const FormSelect = ({data, options, handleChange}) => {
  const {label, value} = data;
  const dropdownOptions = formatDropdownOptions(options);

  // handle dropdown select change
  const handleDropdownSelectChange = optionValue => {
    handleChange({name: label, value: optionValue});
  }

  return (
    <div className="Form FormSelect">
      <label htmlFor={label} className="Form__label">{label}</label>
      <div className="Form__input-holder">
        <Dropdown 
          menuType="select"
          menuOptions={dropdownOptions}
          menuCurrentValue={value}
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