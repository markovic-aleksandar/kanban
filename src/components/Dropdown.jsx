import { useRef, isValidElement, cloneElement } from 'react';
import useClickOutside from '../hooks/useClickOutside';
import useDropdown from '../hooks/useDropdown';
import { IconChevron } from '../constants/icons';

const Dropdown = ({menuType = 'dropdown', menuOptions, menuOption = null, menuPlacement = 'left', menuStyle = null, menuTrigger = null, menuAction}) => {
  const {
    isOpen,
    options,
    currentOption,
    handleToggleDropdown, 
    handleCloseDropdown, 
    handleOptionDropdown
  } = useDropdown(menuOptions, menuOption);
  const dropdownRef = useRef(null);

  // click outside to close dropdown
  useClickOutside(dropdownRef, handleCloseDropdown, isOpen);

  return (
    <div
      ref={dropdownRef}
      className={menuType === 'select' ? 'Dropdown__select' : 'Dropdown'}
    >
      <MenuTrigger
        menuType={menuType}
        menuTrigger={menuTrigger}
        menuIsOpen={isOpen}
        menuCurrentOption={currentOption}
        handleToggleDropdown={handleToggleDropdown} 
      />
      {isOpen && (
        <ul
          style={menuStyle || null}
          className={`Dropdown__options Dropdown__options-${menuPlacement} ${menuType === 'select' && 'Dropdown__select-options'}`}
        >
          {options.map(option => {
            const {key, label, style} = option;
            return (
              <li 
                key={key} 
                className={menuType === 'select' ? 'Dropdown__select-option' : 'Dropdown__option'}  
              >
                <button
                  type="button"
                  style={style || null}
                  onClick={() => handleOptionDropdown(option, menuAction)}
                >
                  {label}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

// menu trigger component
const MenuTrigger = ({menuType, menuTrigger, menuIsOpen, menuCurrentOption, handleToggleDropdown}) => {
  // check if menu trigger is valid element
  if (isValidElement(menuTrigger)) {
    const menuTriggerEl = cloneElement(menuTrigger, 
      {
        className: `${menuTrigger.props.className} Dropdown__trigger ${menuIsOpen && 'active'}`,
        onClick: handleToggleDropdown,
        children: menuType === 'select' ? (
          <>
            <span>{menuCurrentOption?.label}</span>
            <IconChevron color="#635fc7" />
          </>
        ) : menuTrigger.props.children
      }
    );
    return menuTriggerEl;
  }
  
  return null;
}

export default Dropdown;