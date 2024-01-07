const BoardTask = ({currentTask}) => {
  const {title, subTasks} = currentTask;
  const completedTasks = subTasks.filter(subTask => subTask.complete).length;

  return (
    <article className="Board__task">
      <h3>{title}</h3>
      <h4>{completedTasks} of {subTasks.length} subtasks</h4>
    </article>
  )
}

export default BoardTask;