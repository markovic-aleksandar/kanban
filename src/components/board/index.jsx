import BoardColumn from './BoardColumn';

const Board = () => {
  return (
    <div className="Board">
      <div className="Board__columns">
        <BoardColumn />
      </div>
    </div>
  )
}

export default Board;