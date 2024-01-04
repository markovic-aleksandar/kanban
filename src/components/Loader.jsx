const Loader = ({variant}) => {
  return (
    <div 
      className={variant ? `Loader ${variant}__loader` : 'Loader'}  
    >
      <span></span>
    </div>
  )
}

export default Loader;