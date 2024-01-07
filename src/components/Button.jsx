export const Button = ({type = 'button', variant, value, handleAction}) => {
  return (
    <button
      type={type}
      className={variant ? `Button ${variant}` : 'Button'}
      onClick={handleAction ? handleAction : null}
    >
      {value}
    </button>
  )
}

export const ButtonIcon = ({type = 'button', variant, value, handleAction, children}) => {
  return (
    <button
      type={type}
      className={variant ? `Button__icon ${variant}` : 'Button__icon'}
      onClick={handleAction ? handleAction : null}
    >
      {children} {value}
    </button>
  )
}