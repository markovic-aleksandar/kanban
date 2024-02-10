import Loader from './Loader';

export const Button = ({type = 'button', variant, value, isLoading, handleAction}) => {
  return (
    <button
      type={type}
      // className={variant ? `Button ${variant}` : 'Button'}
      className={`Button ${variant ? variant : ''} ${isLoading ? 'Button__disabled' : ''}`}
      onClick={handleAction && !isLoading ? handleAction : null}
    >
      {isLoading ? (
        <Loader variant="Button" />
      ) : value}
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