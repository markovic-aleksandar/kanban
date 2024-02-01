import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useFormControl from '../../hooks/useFormControl';
import { switchModal } from '../../services/modal';
import { manageCurrentTask } from '../../services/column';
import Dropdown from '../Dropdown';
import FormCheckbox from '../form/FormCheckbox';
import FormSelect from '../form/FormSelect';
import { IconEllipsis } from '../../constants/icons';

const CurrentTask = ({currentTaskId}) => {
  const {currentBoard: {columns: currentBoardColumns}} = useSelector(store => store.board);
  const {currentColumn, currentTask} = currentBoardColumns.reduce((total, column) => {
    const targetColumnTask = column.tasks.find(task => task.$id === currentTaskId);
    if (targetColumnTask) total = {currentColumn: column, currentTask: targetColumnTask};
    return total;
  }, {currentColumn: null, currentTask: null});
  const {title, description, subtasks} = currentTask;
  const {formData, formDataIsUpdated, handleChangeFormData} = useFormControl({
    subtasks: {label: 'subtasks', value: subtasks, isCheckbox: true},
    status: {label: 'status', value: currentColumn, error: false}
  });
  const currentBoardColumnsRef = useRef(currentBoardColumns);
  const dispatch = useDispatch();
  const dropdownOptions = [
    {name: 'Edit Task', style: null},
    {name: 'Delete Task', style: {color: '#ea5555'}}
  ];

  // handle task
  const handleTask = option => {
    // edit task
    if (option.key === 'edit-task') {
      switchModal(dispatch, option.key, currentTask);
    }

    // delete task
    if (option.key === 'delete-task') {
      switchModal(dispatch, 'delete-modal', {
        type: 'task',
        name: currentTask.title,
        item: {$id: currentTask.$id, columnId: currentTask.columnId}
      });
    }
  }

  useEffect(() => {
    currentBoardColumnsRef.current = currentBoardColumns;
  }, [currentBoardColumns]);

  // handle manage current task
  useEffect(() => {
    if (formDataIsUpdated) {
      manageCurrentTask(dispatch, formData, currentTask, currentBoardColumnsRef.current);
    }
  }, [formData, formDataIsUpdated, currentTask, dispatch]);

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
          menuAction={handleTask}
        />
      </div>
      
      <p className="Modal__content-description">{description || 'No description'}</p>

      <div className="Modal__content-box">
        <FormCheckbox 
          label={formData.subtasks.label}
          options={formData.subtasks.value}
          handleChange={handleChangeFormData}
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
    </>
  )
}

export default CurrentTask;