import { useSelector, useDispatch } from 'react-redux';
import useMediaQuery from '../../hooks/useMediaQuery';
import { showModal } from '../../services/modal';
import { ButtonIcon } from "..";
import Dropdown from '../Dropdown';
import { IconPlus, IconEllipsis } from '../../constants/icons';

const NavbarManage = () => {
  const {currentBoard} = useSelector(store => store.board);
  const isMobile = useMediaQuery('mobile');
  const dropdownOptions = [
    {name: 'Edit Board', style: null},
    {name: 'Delete Board', style: {color: '#ea5555'}}
  ];
  const dispatch = useDispatch();

  // handle board
  const handleBoard = option => {
    // edit board
    if (option.key === 'edit-board') {
      showModal(dispatch, option.key);
    }

    // delete board
    if (option.key === 'delete-board') {
      showModal(dispatch, 'delete-modal', {
        type: 'board',
        id: currentBoard.$id,
        name: currentBoard.name
      });
    }
  }

  return (
    <div className="Manage">
      <ButtonIcon 
        variant="Button__main" 
        value={isMobile ? '' : 'Add New task'}
        handleAction={() => showModal(dispatch, 'add-task')}
      >
        <IconPlus />
      </ButtonIcon>
      
      <Dropdown 
        menuOptions={dropdownOptions}
        menuPlacement="right"
        menuStyle={{width: '12.5rem'}}
        menuTrigger={
          <button
            type="button"
            className="Dropdown__ellipsis-button"
          >
            <IconEllipsis />
          </button>
        }
        menuAction={handleBoard}
      />
    </div>
  )
}

export default NavbarManage;