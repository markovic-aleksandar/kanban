import { useSelector, useDispatch } from 'react-redux';
import { showSidebar } from '../../services/global';
import BoardColumn from './BoardColumn';
import { IconShow } from '../../constants/icons';

const Board = () => {
  const {sidebarIsVisible} = useSelector(store => store.global);
  const dispatch = useDispatch();

  return (
    <div 
      className={sidebarIsVisible ? 'Board' : 'Board Board__is-full'}
    >
      <div className="Board__columns">
        <BoardColumn />
        <BoardColumn isAdding={true} />
      </div>
      <button 
        type="button" 
        className="Board__showButton"
        onClick={() => showSidebar(dispatch)}  
      >
        <IconShow />
      </button>
    </div>
  )
}

export default Board;