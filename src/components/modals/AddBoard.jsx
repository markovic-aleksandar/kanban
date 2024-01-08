import { useSelector } from 'react-redux';
import useFormControl from '../../hooks/useFormControl';
import FormInput from '../form/FormInput';
import FormClearableInput from '../form/FormClearableInput';
import { Button, ButtonIcon } from '../Button';
import { IconPlus } from '../../constants/icons';

const AddBoard = () => {
  const {boards} = useSelector(store => store.board);
  const {formData, handleChangeFormData, handleAddClearableInput, handleRemoveClearableInput} = useFormControl({
    name: {label: 'name', value: '', error: false, isRequired: true, isUnique: boards},
    columns: {label: 'columns', value: [
      {value: '', error: false}
    ], isRequired: true, isUnique: true}
  });

  return (
    <>
      <div className="Modal__content-box">
        <FormInput
          type="text"
          name={formData.name.label}
          label={formData.name.label}
          value={formData.name.value}
          error={formData.name.error}
          handleChange={handleChangeFormData}
        />
      </div>

      <div className="Modal__content-box">
        <FormClearableInput
          label={formData.columns.label}
          inputs={formData.columns.value}
          handleChange={handleChangeFormData}
          handleRemove={handleRemoveClearableInput}
        />
      </div>

      <div className="Modal__content-box">
        {formData.columns.value.length < 6 && (
          <ButtonIcon 
            variant="Button__small Button__full Button__light" 
            value="Add New Column"
            handleAction={() => handleAddClearableInput(formData.columns.label)} 
          >
            <IconPlus />
          </ButtonIcon>
        )}
      </div>

      <div className="Modal__content-box">
        <Button variant="Button__small Button__full Button__main" value="Create New Board" />
      </div>
    </>
  )
}

export default AddBoard;