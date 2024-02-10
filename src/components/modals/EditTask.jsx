import { useSelector, useDispatch } from 'react-redux';
import useLoading from '../../hooks/useLoading';
import useFormControl from '../../hooks/useFormControl';
import { editTask } from '../../services/column';
import FormInput from '../form/FormInput';
import FormTextarea from '../form/FormTextarea';
import FormClearableInput from '../form/FormClearableInput';
import FormSelect from '../form/FormSelect';
import { Button } from '../Button';

const EditTask = ({currentTask}) => {
  const {title, description, subtasks, columnId} = currentTask;
  const {currentBoard: {columns: currentBoardColumns}} = useSelector(store => store.board);
  const currentColumn = currentBoardColumns.find(column => column.$id === columnId);
  const {formData, handleChangeFormData, handleValidateFormData, handleAddClearableInput, handleRemoveClearableInput} = useFormControl({
    title: {label: 'title', value: title, error: false, isRequired: true},
    description: {label: 'description', value: description, error: false},
    subtasks: {label: 'subtasks', value: subtasks, isRequired: true, isFocusable: true},
    status: {label: 'status', value: currentColumn, error: false}
  });
  const {isLoading, setLoading} = useLoading();
  const dispatch = useDispatch();
  
  // handle edit current task
  const handleEditCurrentTask = () => {
    handleValidateFormData(() => {
      editTask({dispatch, setLoading}, formData, currentTask, currentBoardColumns);
    });
  } 

  return (
    <>
      <div className="Modal__content-box">
        <FormInput
          data={formData.title}
          handleChange={handleChangeFormData}
        />
      </div>

      <div className="Modal__content-box">
        <FormTextarea
          data={formData.description}
          handleChange={handleChangeFormData}
        />
      </div>

      <div className="Modal__content-box">
        <FormClearableInput
          data={formData.subtasks}
          maxDataLength={7}
          handleChange={handleChangeFormData}
          handleAdd={handleAddClearableInput}
          handleRemove={handleRemoveClearableInput}
        />
      </div>

      <div className="Modal__content-box">
        <FormSelect
          label={formData.status.label}
          value={formData.status.value}
          options={currentBoardColumns}
          handleChange={handleChangeFormData}
        />
      </div>

      <div className="Modal__content-box">
        <Button 
          variant="Button__small Button__full Button__main" 
          value="Save Changes"
          isLoading={isLoading}
          handleAction={handleEditCurrentTask}
        />
      </div>
    </>
  )
}

export default EditTask;