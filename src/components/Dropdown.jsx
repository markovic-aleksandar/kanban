import { useRef, isValidElement, cloneElement } from 'react';
import useClickOutside from '../hooks/useClickOutside';
import useDropdown from '../hooks/useDropdown';

const DropdownMenu = ({menuType = 'dropdown', menuOptions, menuPlacement = 'left', menuStyle = null, menuTrigger = null, menuAction}) => {
  const {isOpen, handleToggleDropdown, handleCloseDropdown, handleOptionDropdown} = useDropdown();
  const dropdownRef = useRef(null);

  // click outside to close dropdown
  useClickOutside(dropdownRef, handleCloseDropdown, isOpen);

  return (
    <div
      ref={dropdownRef}
      className="Dropdown"
    >
      <MenuTrigger 
        menuType={menuType}
        menuTrigger={menuTrigger} 
        handleToggleDropdown={handleToggleDropdown} 
      />
      {isOpen && (
        <ul
          style={menuStyle || null} 
          className={`Dropdown__options Dropdown__options-${menuPlacement}`}
        >
          {menuOptions.map(option => {
            const {key, name, style} = option;
            return (
              <li key={key} className="Dropdown__option">
                <button
                  type="button"
                  style={style || null}
                  onClick={menuAction ? () => handleOptionDropdown(option, menuAction) : null}
                >
                  {name}
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
const MenuTrigger = ({menuType, menuTrigger, handleToggleDropdown}) => {
  // check if type is "select"
  if (menuType === 'select') {
    return '... ovde treba da vratis za select'
  }

  // check if menu trigger is valid element
  if (isValidElement(menuTrigger)) {
    const menuTriggerEl = cloneElement(menuTrigger, 
      {
        className: `${menuTrigger.props.className} Dropdown__trigger`, 
        onClick: handleToggleDropdown
      }
    );
    return menuTriggerEl;
  }
  
  return null;
}

export default DropdownMenu;