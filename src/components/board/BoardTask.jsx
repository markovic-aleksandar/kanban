const BoardTask = ({currentTask}) => {
  const {title, subtasks} = currentTask;
  const completedTasks = subtasks.filter(subTask => subTask.complete).length;

  return (
    <article className="Board__task">
      <h3>{title}</h3>
      <h4>{completedTasks} of {subtasks.length} subtasks</h4>
    </article>
  )
}

export default BoardTask;