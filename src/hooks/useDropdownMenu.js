import { useState } from 'react';
import useEventListener from './useEventListener';

const useDropdownMenu = (options, initSelectedOption = null) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(initSelectedOption);

  // handle toggle dropdown menu
  const handleToggleDropdownMenu = () => {
    setIsOpen(prevValue => !prevValue);
  }

  // handle close dropdown menu
  const handleCloseDropdownMenu = e => {
    const targetEl = e.target;
    const isDropdownButton = targetEl.classList.contains('Dropdown__button') || targetEl.closest('.Dropdown__button');

    setIsOpen(prevValue => {
      return !isDropdownButton && prevValue ? false : prevValue;
    });
  }

  // select option
  const selectOption = option => setSelectedOption(option);

  // add event listener on window to close opened dropdown menu
  useEventListener('click', handleCloseDropdownMenu, window);

  return {
    options,
    isOpen,
    selectedOption,
    handleToggleDropdownMenu,
    selectOption
  }

}

export default useDropdownMenu;