import { useState, useEffect } from 'react';
import { formatListOption } from '../utils';

const useDropdown = (initOptions, initOption) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [currentOption, setCurrentOption] = useState(null);

  // handle toggle dropdown
  const handleToggleDropdown = () => {
    setIsOpen(prevValue => !prevValue);
  }

  // handle close dropdown
  const handleCloseDropdown = () => {
    setIsOpen(false);
  }

  // handle option dropdown
  const handleOptionDropdown = (option, handleAction) => {
    // handle action
    if (handleAction) handleAction(option);
    // set current option
    setCurrentOption(option);
    // handle close dropdown
    handleCloseDropdown();
  }

  // init options and current option
  useEffect(() => {
    const options = initOptions.map(initOption => formatListOption(initOption));
    const currentOption = initOption ? formatListOption(initOption) : options[0];

    // set options
    setOptions(options);
    // set current option
    setCurrentOption(currentOption);
  }, [initOptions, initOption]);

  return {
    isOpen,
    options,
    currentOption,
    handleToggleDropdown,
    handleCloseDropdown,
    handleOptionDropdown
  }
}

export default useDropdown;