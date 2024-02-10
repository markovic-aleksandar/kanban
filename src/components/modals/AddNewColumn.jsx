import { useSelector, useDispatch } from 'react-redux';
import useLoading from '../../hooks/useLoading';
import useFormControl from '../../hooks/useFormControl';
import { addNewColumn } from '../../services/column';
import FormInput from '../form/FormInput';
import FormClearableInput from '../form/FormClearableInput';
import { Button } from '../Button';

const AddNewColumn = () => {
  const {currentBoard} = useSelector(store => store.board);
  const {formData, handleChangeFormData, handleValidateFormData, handleAddClearableInput, handleRemoveClearableInput} = useFormControl({
    name: {label: 'name', value: currentBoard.name, error: false, isDisabled: true},
    columns: {label: 'columns', value: currentBoard.columns, isRequired: true, isUnique: true, isFocusable: true}
  });
  const {isLoading, setLoading} = useLoading();
  const dispatch = useDispatch();

  // handle add new column
  const handleAddNewColumn = () => {
    handleValidateFormData(() => {
      addNewColumn({dispatch, setLoading}, formData, currentBoard);
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
          maxDataLength={6}
          handleChange={handleChangeFormData}
          handleAdd={handleAddClearableInput}
          handleRemove={handleRemoveClearableInput}
        />
      </div>

      <div className="Modal__content-box">
        <Button 
          variant="Button__small Button__full Button__main" 
          value="Save Changes"
          isLoading={isLoading}
          handleAction={handleAddNewColumn}
        />
      </div>
    </>
  )
}

export default AddNewColumn;