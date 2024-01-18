import BoardTask from './BoardTask';
import { IconPlus } from '../../constants/icons';

const BoardColumn = ({currentColumn, currentColumnIndex, isAdding}) => {
  return (
    <div 
      className={
        isAdding ? 'Board__column Board__column-adding' : currentColumn.tasks.length < 1 ? 'Board__column Board__column-empty' : 'Board__column'}  
    >
      {isAdding ? (
        <button type="button">
          <IconPlus /> New Column
        </button>
      ) : (
        <>
          <div className="Board__column-title">
            <span className={`Board__column-color Board__column-color--${currentColumnIndex}`} />
            <span>{currentColumn.name} ({currentColumn.tasks.length})</span>
          </div>
          <div className="Board__tasks">
            {currentColumn.tasks.map(task => {
              return (
                <BoardTask key={task.$id} currentTask={task} />
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

export default BoardColumn;