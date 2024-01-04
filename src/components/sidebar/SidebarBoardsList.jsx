import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IconBoard } from '../../constants/icons';

const SidebarBoardsList = () => {
  const {boards} = useSelector(store => store.board);

  useEffect(() => {
    console.log('coa');
  });

  return (
    <div className="BoardsList">
      <p className="BoardsList__count">All boards ({boards.length})</p>
      <div className="BoardsList__tabs">
        {boards.map(board => {
          console.log(board);
          return (
            <button 
              key={board.$id}
              type="button" 
              className="BoardsList__tab BoardsList__tab--active"
            >
              <IconBoard color="#828fa3" />
              {board.name}
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