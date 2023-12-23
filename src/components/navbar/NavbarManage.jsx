import { useEffect } from 'react';
import useDropdownMenu from '../../hooks/useDropdownMenu';
import useMediaQuery from '../../hooks/useMediaQuery';
import { ButtonIcon, DropdownMenu } from "..";
import { IconPlus, IconEllipsis } from '../../constants/icons';

const NavbarManage = () => {
  const {options, isOpen, selectedOption, handleToggleDropdownMenu, selectOption} = useDropdownMenu([
    {value: 'edit', label: 'Edit  Board'},
    {value: 'delete', label: 'Delete Board'}
  ]);
  const isMobile = useMediaQuery('mobile');

  // handle when happened click on option
  useEffect(() => {
    if (!selectedOption) return;
    // onda ovde ide neka f-ja iz service koja prima paramtetar ako ova vrednost nije prazna
    // i isto u ovom slucaju, ali samo ovde, mozda bi trebalo da se resetuje na null ili mozda i ne, ali samo vodi racuna da nesto ne pokrene ponovno pokretanja ovog effect-a a on ce imati vrednost
    console.log('run function');
  }, [selectedOption]);

  return (
    <div className="Manage">
      <ButtonIcon variant="main" value={isMobile ? '' : 'Add New task'}>
        <IconPlus />
      </ButtonIcon>
      
      <button
        type="button"
        className="Dropdown__button"
        onClick={handleToggleDropdownMenu}
      >
        <IconEllipsis />
      </button>
      
      {isOpen && <DropdownMenu options={options} handleAction={selectOption} />}
    </div>
  )
}

export default NavbarManage;