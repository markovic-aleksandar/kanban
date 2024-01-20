import { useSelector, useDispatch } from 'react-redux';
import useFormControl from '../../hooks/useFormControl';
import { addNewColumn } from '../../services/column';
import FormInput from '../form/FormInput';
import FormClearableInput from '../form/FormClearableInput';
import { Button, ButtonIcon } from '../Button';
import { IconPlus } from '../../constants/icons';

const AddNewColumn = () => {
  const {currentBoard} = useSelector(store => store.board);
  const {formData, handleChangeFormData, handleValidateFormData, handleAddClearableInput, handleRemoveClearableInput} = useFormControl({
    name: {label: 'name', value: currentBoard.name, error: false, isDisabled: true},
    columns: {label: 'columns', value: currentBoard.columns, isRequired: true, isUnique: true, isFocusable: true}
  })
  const dispatch = useDispatch();

  // handle add new column
  const handleAddNewColumn = () => {
    handleValidateFormData(() => {
      addNewColumn(dispatch, formData, currentBoard);
    });
  }
  
  return (
    <>
      <div className="Modal__content-box">
        <FormInput 
          data={formData.name}
          handleChange={handleChangeFormData}
        />
      </div>

      <div className="Modal__content-box">
        <FormClearableInput 
          data={formData.columns}
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
        <Button 
          variant="Button__small Button__full Button__main" 
          value="Save Changes"
          handleAction={handleAddNewColumn}
        />
      </div>
    </>
  )
}

export default AddNewColumn;