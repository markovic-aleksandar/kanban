import { useDispatch } from 'react-redux';
import { showModal } from '../../services/modal';
import BoardTask from './BoardTask';
import { Droppable } from '@hello-pangea/dnd';
import { IconPlus } from '../../constants/icons';

const BoardColumn = ({currentColumn, currentColumnIndex, isAdding}) => {
  const dispatch = useDispatch();

  // is adding column
  if (isAdding) {
    return (
      <div className="Board__column Board__column-adding">
        <button
          type="button"
          onClick={() => showModal(dispatch, 'add-new-column')}
        >
          <IconPlus /> New Column
        </button>
      </div>
    )
  }
  
  return (
    <div className={currentColumn.tasks.length < 1 ? 'Board__column Board__column-empty' : 'Board__column'}>
      <div className="Board__column-title">
        <span className={`Board__column-color Board__column-color--${currentColumnIndex}`} />
        <span>{currentColumn.name} ({currentColumn.tasks.length})</span>
      </div>
      <Droppable droppableId={currentColumn.$id}>
        {droppableProvider => (
          <div 
            ref={droppableProvider.innerRef}  
            className="Board__tasks"
            {...droppableProvider.droppableProps}
          >
            {currentColumn.tasks.map((task, index) => {
              return (
                <BoardTask key={task.$id} currentTask={task} index={index} />
              )
            })}
            {droppableProvider.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default BoardColumn;