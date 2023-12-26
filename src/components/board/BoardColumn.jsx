import BoardTask from './BoardTask';
import { IconPlus } from '../../constants/icons';

const BoardColumn = ({isAdding}) => {
  return (
    <div className={isAdding ? 'Board__column Board__column-adding' : 'Board__column'}>
      {isAdding ? (
        <button type="button">
          <IconPlus /> New Column
        </button>
      ) : (
        <>
          <div className="Board__column-title">
            <span className="Board__column-color" />
            <span>Todo (5)</span>
          </div>
          <div className="Board__tasks">
            <BoardTask />
          </div>
        </>
      )}
    </div>
  )
}

export default BoardColumn;