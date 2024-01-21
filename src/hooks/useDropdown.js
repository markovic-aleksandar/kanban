import { useState } from 'react';

const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  // handle toggle dropdown
  const handleToggleDropdown = () => {
    setIsOpen(prevValue => !prevValue);
  }

  // handle close dropdown
  const handleCloseDropdown = () => {
    setIsOpen(false);
  }

  // handle option dropdown
  const handleOptionDropdown = (e, handleAction) => {
    // get target el value
    const targetValue = e.currentTarget.textContent;
    // handle action
    handleAction(targetValue);
    // handle close dropdown
    handleCloseDropdown();
  }

  return {
    isOpen,
    handleToggleDropdown,
    handleCloseDropdown,
    handleOptionDropdown
  }
}

export default useDropdown;