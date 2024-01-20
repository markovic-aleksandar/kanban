import { useDispatch } from 'react-redux';
import useMediaQuery from '../../hooks/useMediaQuery';
import { showModal } from '../../services/modal';
import { ButtonIcon } from "..";
import Dropdown from '../Dropdown';
import { IconPlus, IconEllipsis } from '../../constants/icons';

const NavbarManage = () => {
  const isMobile = useMediaQuery('mobile');
  const dropdownOptions = [
    {key: 'edit-board', name: 'Edit Board', style: null},
    {key: 'delete-board', name: 'Delete Board', style: {color: '#ea5555'}}
  ]; // mozda neka f-ja koja ce da mi kreira ovaj array template
  const dispatch = useDispatch();

  // handle board
  const handleBoard = optionValue => { // vidi kako ovo mozda drugacije da handleujes
    if (optionValue.key === 'edit-board') {
      showModal(dispatch, 'edit-board');
    }
  }

  return (
    <div className="Manage">
      <ButtonIcon 
        variant="Button__main" 
        value={isMobile ? '' : 'Add New task'}
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
            className="Dropdown__button"
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