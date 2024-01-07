import { useSelector } from 'react-redux';
import { IconBoard } from '../../constants/icons';

const SidebarBoardsList = () => {
  const {boards, currentBoard} = useSelector(store => store.board);

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
            >
              <IconBoard />
              {name}
            </button>    
          )
        })}
        <button type="button" className="BoardsList__create">
          <IconBoard />
          + Create New Board
        </button>
      </div>
    </div>
  )
}

export default SidebarBoardsList;