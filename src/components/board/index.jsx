import { useSelector } from 'react-redux';
import Loader from '../Loader';
import { ButtonIcon } from '../Button';
import BoardColumn from './BoardColumn';
import { IconPlus } from '../../constants/icons';

const Board = () => {
  let {sidebarIsVisible, loader} = useSelector(store => store.global);
  const { boards } = useSelector(store => store.board);

  return (
    <div 
      className={sidebarIsVisible ? 'Board' : 'Board Board__is-full'}
    >
      {loader ? (
        <div className="Board__flex-content">
          <Loader />
        </div>
      ) : (
        boards.length > 0 ? (
          <div className="Board__columns">
            <BoardColumn />
            <BoardColumn isAdding={true} />
          </div>
        ) : (
          <div className=" Board__flex-content Board__no-column">
            <p>No board found. Create a new board to get started.</p>
            <ButtonIcon variant="main" value="Create New Board">
              <IconPlus />
            </ButtonIcon>
          </div>
        )
      )}
    </div>
  )
}

export default Board;