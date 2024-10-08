import { useSelector, useDispatch } from 'react-redux';
import useLoading from '../../hooks/useLoading';
import useFormControl from '../../hooks/useFormControl';
import { addNewTask } from '../../services/column';
import FormInput from '../form/FormInput';
import FormTextarea from '../form/FormTextarea';
import FormClearableInput from '../form/FormClearableInput';
import FormSelect from '../form/FormSelect';
import { Button } from '../Button';

const AddTask = () => {
  const {currentBoard} = useSelector(store => store.board);
  const {formData, handleChangeFormData, handleValidateFormData, handleAddClearableInput, handleRemoveClearableInput} = useFormControl({
    title: {label: 'title', value: '', error: false, isRequired: true},
    description: {label: 'description', value: '', error: false},
    subtasks: {label: 'subtasks', value: [], isRequired: true, isFocusable: true},
    status: {label: 'status', value: currentBoard.columns[0], error: false}
  });
  const {isLoading, setLoading} = useLoading();
  const dispatch = useDispatch();

  // handle add new task
  const handleAddNewTask = () => {
    handleValidateFormData(() => {
      addNewTask({dispatch, setLoading}, formData, currentBoard);
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
          options={currentBoard.columns}
          handleChange={handleChangeFormData}
        />
      </div>

      <div className="Modal__content-box">
        <Button 
          variant="Button__small Button__full Button__main" 
          value="Create Task"
          isLoading={isLoading}
          handleAction={handleAddNewTask}
        />
      </div>
    </>
  )
}

export default AddTask;