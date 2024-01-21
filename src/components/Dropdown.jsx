import { useRef, isValidElement, cloneElement } from 'react';
import useClickOutside from '../hooks/useClickOutside';
import useDropdown from '../hooks/useDropdown';
import { IconChevron } from '../constants/icons';

const Dropdown = ({menuType = 'dropdown', menuOptions, menuCurrentValue = null, menuPlacement = 'left', menuStyle = null, menuTrigger = null, menuAction}) => {
  const {isOpen, handleToggleDropdown, handleCloseDropdown, handleOptionDropdown} = useDropdown();
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
        menuCurrentValue={menuCurrentValue}
        menuIsOpen={isOpen}
        handleToggleDropdown={handleToggleDropdown} 
      />
      {isOpen && (
        <ul
          style={menuStyle || null}
          className={`Dropdown__options Dropdown__options-${menuPlacement} ${menuType === 'select' && 'Dropdown__select-options'}`}
        >
          {menuOptions.map(option => {
            const {value, label, style} = option;
            return (
              <li 
                key={value} 
                className={menuType === 'select' ? 'Dropdown__select-option' : 'Dropdown__option'}  
              >
                <button
                  type="button"
                  style={style || null}
                  onClick={menuAction ? e => handleOptionDropdown(e, menuAction) : null}
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
const MenuTrigger = ({menuType, menuTrigger, menuCurrentValue, menuIsOpen, handleToggleDropdown}) => {
  // check if menu trigger is valid element
  if (isValidElement(menuTrigger)) {
    const menuTriggerEl = cloneElement(menuTrigger, 
      {
        className: `${menuTrigger.props.className} Dropdown__trigger ${menuIsOpen && 'active'}`,
        onClick: handleToggleDropdown,
        children: menuType === 'select' ? (
          <>
            <span>{menuCurrentValue}</span>
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