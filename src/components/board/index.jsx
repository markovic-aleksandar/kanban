import { useSelector, useDispatch } from 'react-redux';
import { showModal } from '../../services/modal';
import { moveTask } from '../../services/column';
import Loader from '../Loader';
import { ButtonIcon } from '../Button';
import BoardColumn from './BoardColumn';
import { DragDropContext } from '@hello-pangea/dnd';
import { IconPlus } from '../../constants/icons';

const Board = () => {
  const {sidebarIsVisible, loader} = useSelector(store => store.global);
  const {boards, currentBoard} = useSelector(store => store.board);
  const dispatch = useDispatch();

  const handleMoveTask = result => {
    moveTask(dispatch, result, currentBoard.columns);
  }

  return (
    <div 
      className={sidebarIsVisible ? 'Board' : 'Board Board__is-full'}
    >
      {loader ? (
        <div className="Board__flex-content">
          <Loader />
        </div>
      ) : (
        boards.length > 0 && currentBoard ? (
          <DragDropContext onDragEnd={handleMoveTask}>
            <div className="Board__columns">
              {currentBoard.columns.map((column, index) => {
                return (
                  <BoardColumn key={column.$id} currentColumn={column} currentColumnIndex={index + 1} />
                )
              })}
              <BoardColumn isAdding={true} />
            </div>
          </DragDropContext>
        ) : (
          <div className=" Board__flex-content Board__no-column">
            <p>No board found. Create a new board to get started.</p>
            <ButtonIcon 
              variant="Button__main" 
              value="Create New Board"
              handleAction={() => showModal(dispatch, 'add-board')}  
            >
              <IconPlus />
            </ButtonIcon>
          </div>
        )
      )}
    </div>
  )
}

export default Board;