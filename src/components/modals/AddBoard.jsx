import { useSelector, useDispatch } from 'react-redux';
import useLoading from '../../hooks/useLoading';
import useFormControl from '../../hooks/useFormControl';
import { addNewBoard } from '../../services/board';
import FormInput from '../form/FormInput';
import FormClearableInput from '../form/FormClearableInput';
import { Button } from '../Button';

const AddBoard = () => {
  const {boards} = useSelector(store => store.board);
  const {formData, handleChangeFormData, handleValidateFormData, handleAddClearableInput, handleRemoveClearableInput} = useFormControl({
    name: {label: 'name', value: '', error: false, isRequired: true, isUnique: boards},
    columns: {label: 'columns', value: [], isRequired: true, isUnique: true, isFocusable: true}
  });
  const {isLoading, setLoading} = useLoading();
  const dispatch = useDispatch();

  // handle add board
  const handleAddBoard = () => {
    handleValidateFormData(() => {
      addNewBoard({dispatch, setLoading}, formData);
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
          value="Create New Board"
          isLoading={isLoading}
          handleAction={handleAddBoard}  
        />
      </div>
    </>
  )
}

export default AddBoard;