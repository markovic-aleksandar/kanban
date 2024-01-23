import { useSelector, useDispatch } from 'react-redux';
import useFormControl from '../../hooks/useFormControl';
import Dropdown from '../Dropdown';
import FormCheckbox from '../form/FormCheckbox';
import FormSelect from '../form/FormSelect';
import { IconEllipsis } from '../../constants/icons';

const CurrentTask = ({currentTask}) => {
  const {title, description, status, subtasks} = currentTask;
  const completedTasks = subtasks.filter(subTask => subTask.complete).length;
  const {currentBoard} = useSelector(store => store.board);
  console.log(currentTask);
  // const {formData, handleChangeFormData} = useFormControl({
  //   subtasks: {},
  //   currentStatus: {label: 'status', value: formatListOption(currentBoard.columns[0]), error: false}
  // });
  const dropdownOptions = [
    {value: 'edit-task', label: 'Edit Task', style: null},
    {value: 'delete-task', label: 'Delete Task', style: {color: '#ea5555'}}
  ];

  return (
    <>
      <div className="Modal__content-header">
        <h2 className="Modal__content-title">{title}</h2>
        <Dropdown 
          menuOptions={dropdownOptions}
          menuPlacement="center"
          menuStyle={{width: '12rem'}}
          menuTrigger={
            <button
              type="button"
              className="Dropdown__ellipsis-button"
            >
              <IconEllipsis />
            </button>
          }
          // menuAction={handleBoard}
        />
      </div>
      
      <p className="Modal__content-description">{description || 'No description'}</p>

      <div className="Modal__content-box">
        <FormCheckbox 
          label={`Subtasks (${completedTasks} of ${subtasks.length})`}
          options={subtasks}
        />
      </div>

      <div className="Modal__content-box">
        <FormSelect 
          label="Current status"
          value={status}
          options={currentBoard.columns}
        />
      </div>
    </>
  )
}

export default CurrentTask;