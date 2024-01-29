import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useFormControl from '../../hooks/useFormControl';
import { manageCurrentTask } from '../../services/column';
import Dropdown from '../Dropdown';
import FormCheckbox from '../form/FormCheckbox';
import FormSelect from '../form/FormSelect';
import { IconEllipsis } from '../../constants/icons';

const CurrentTask = ({currentTask}) => {
  const {title, description, status, subtasks} = currentTask;
  const {currentBoard: {columns: currentBoardColumns}} = useSelector(store => store.board);
  const currentColumn = currentBoardColumns.find(currentBoardColum => currentBoardColum.name === status);
  const {formData, formDataIsUpdated, handleChangeFormData} = useFormControl({
    subtasks: {label: 'subtasks', value: subtasks, isCheckbox: true},
    status: {label: 'status', value: currentColumn, error: false}
  });
  const dispatch = useDispatch();
  const dropdownOptions = [
    {name: 'Edit Task', style: null},
    {name: 'Delete Task', style: {color: '#ea5555'}}
  ];
  const currentTaskRef = useRef(currentTask);
  const currentBoardColumnsRef = useRef(currentBoardColumns);

  useEffect(() => {
    currentTaskRef.current = currentTask;
  }, [currentTask]);

  useEffect(() => {
    currentBoardColumnsRef.current = currentBoardColumns;
  }, [currentBoardColumns]);

  useEffect(() => {
    if (formDataIsUpdated) {
      manageCurrentTask(dispatch, formData, currentTaskRef.current, currentBoardColumnsRef.current);
    }
  }, [formData, formDataIsUpdated, dispatch]);

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