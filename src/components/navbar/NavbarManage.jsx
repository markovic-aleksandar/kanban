import { useDispatch } from 'react-redux';
import useMediaQuery from '../../hooks/useMediaQuery';
import { showModal } from '../../services/modal';
import { ButtonIcon } from "..";
import Dropdown from '../Dropdown';
import { IconPlus, IconEllipsis } from '../../constants/icons';

const NavbarManage = () => {
  const isMobile = useMediaQuery('mobile');
  const dropdownOptions = [
    {value: 'edit-board', label: 'Edit Board', style: null},
    {value: 'delete-board', label: 'Delete Board', style: {color: '#ea5555'}}
  ];
  const dispatch = useDispatch();

  // handle board
  const handleBoard = option => { // vidi kako ovo mozda drugacije da handleujes
    console.log(option);
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