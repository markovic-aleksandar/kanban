import BoardTask from './BoardTask';

const BoardColumn = () => {
  return (
    <div className="Board__column">
      <div className="Board__tasks">
        <BoardTask />
      </div>
    </div>
  )
}

export default BoardColumn;