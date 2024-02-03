import { useSelector, useDispatch } from 'react-redux';
import { showModal } from '../../services/modal';
import { changeCurrentBoard } from '../../services/board';
import { IconBoard } from '../../constants/icons';

const SidebarBoardsList = () => {
  const {boards, currentBoard} = useSelector(store => store.board);
  const dispatch = useDispatch();

  // handle change current board
  const handleChangeCurrentBoard = (currentBoardId) => {
    changeCurrentBoard(dispatch, boards, currentBoardId);
  }

  return (
    <div className="BoardsList">
      <p className="BoardsList__count">All boards ({boards.length})</p>
      <div className="BoardsList__tabs">
        {boards.map(board => {
          const {$id, name} = board;
          const isActive = $id === currentBoard?.$id;
          return (
            <button 
              key={$id}
              type="button"
              className={isActive ? 'BoardsList__tab BoardsList__tab--active' : 'BoardsList__tab'}
              onClick={() => handleChangeCurrentBoard($id)}
            >
              <IconBoard />
              {name}
            </button>    
          )
        })}
        <button 
          type="button" 
          className="BoardsList__create"
          onClick={() => showModal(dispatch, 'add-board')}  
        >
          <IconBoard />
          + Create New Board
        </button>
      </div>
    </div>
  )
}

export default SidebarBoardsList;