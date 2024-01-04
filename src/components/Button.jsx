export const Button = ({type = 'button', variant = null, value, handleAction = null}) => {
  return (
    <button
      type={type}
      className={variant ? `Button Button__${variant}` : 'Button'}
      onClick={handleAction ? handleAction : null}
    >
      {value}
    </button>
  )
}

export const ButtonIcon = ({type = 'button', variant = null, value, handleAction, children}) => {
  return (
    <button
      type={type}
      className={variant ? `Button__icon Button__icon__${variant}` : 'Button__icon'}
      onClick={handleAction ? handleAction : null}
    >
      {children} {value}
    </button>
  )
}