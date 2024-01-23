import Dropdown from '../Dropdown';
import { formatListOption } from '../../utils';

const FormSelect = ({label, value, options, handleChange}) => {
  const dropdownOptions = options.map(option => formatListOption(option));

  // handle dropdown select change
  const handleDropdownSelectChange = option => {
    handleChange({name: label, value: option});
  }

  return (
    <div className="Form FormSelect">
      <label className="Form__label">{label}</label>
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