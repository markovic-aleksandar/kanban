import { useDispatch } from 'react-redux';
import { showModal } from '../../services/modal';
import { Draggable } from '@hello-pangea/dnd';

const BoardTask = ({currentTask, index}) => {
  const {$id, title, subtasks} = currentTask;
  const completedTasks = subtasks.filter(subTask => subTask.complete).length;
  const dispatch = useDispatch();

  return (
    <Draggable index={index} draggableId={$id}>
      {draggableProvider => (
        <article
          ref={draggableProvider.innerRef}
          {...draggableProvider.draggableProps}
          {...draggableProvider.dragHandleProps}
          className="Board__task" 
          onClick={() => showModal(dispatch, 'current-task', $id)}  
        >
          <h3>{title}</h3>
          <h4>{completedTasks} of {subtasks.length} subtasks</h4>
        </article>
      )}
    </Draggable>
  )
}

export default BoardTask;