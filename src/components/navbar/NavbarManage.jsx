import useMediaQuery from '../../hooks/useMediaQuery';
import { ButtonIcon } from "..";
import Dropdown from '../Dropdown';
import { IconPlus, IconEllipsis } from '../../constants/icons';

const NavbarManage = () => {
  const isMobile = useMediaQuery('mobile');
  const dropdownOptions = [
    {key: 'edit-board', name: 'Edit Board', style: null},
    {key: 'delete-board', name: 'Delete Board', style: {color: '#ea5555'}}
  ]; // mozda neka f-ja koja ce da mi kreira ovaj array template
  
  // handle board
  const handleBoard = optionValue => {
    console.log(optionValue);
  }

  return (
    <div className="Manage">
      <ButtonIcon variant="main" value={isMobile ? '' : 'Add New task'}>
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