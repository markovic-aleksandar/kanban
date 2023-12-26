import BoardColumn from './BoardColumn';

const Board = () => {
  return (
    <div className="Board">
      <div className="Board__columns">
        <BoardColumn />
        <BoardColumn isAdding={true} />
      </div>
    </div>
  )
}

export default Board;