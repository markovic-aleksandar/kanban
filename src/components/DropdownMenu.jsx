const DropdownMenu = ({options, handleAction}) => {
  return (
    <ul className="Dropdown__menu">
      {options.map((option, index) => {
        const {value, label} = option;
        return (
          <li
            key={index}
            className="Dropdown__option"
            onClick={() => handleAction(value)}
          >
            {label}
          </li>
        )
      })}
    </ul>
  )
}

export default DropdownMenu;