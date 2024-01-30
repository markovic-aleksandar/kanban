import { useDispatch } from 'react-redux';
import { showModal } from '../../services/modal';

const BoardTask = ({currentTask}) => {
  const {$id, title, subtasks} = currentTask;
  const completedTasks = subtasks.filter(subTask => subTask.complete).length;
  const dispatch = useDispatch();

  return (
    <article 
      className="Board__task" 
      onClick={() => showModal(dispatch, 'current-task', $id)}  
    >
      <h3>{title}</h3>
      <h4>{completedTasks} of {subtasks.length} subtasks</h4>
    </article>
  )
}

export default BoardTask;