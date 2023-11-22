import { IconSun, IconMoon } from '../constants/icons';

const ThemeToggle = () => {
  return (
    <div className="ThemeToggle">
      <span className="ThemeToggle__icon">
        <IconSun />
      </span>
      <button type="button" className="ThemeToggle__button">
        <span></span>  
      </button>
      <span className="ThemeToggle__icon">
        <IconMoon />
      </span>
    </div>
  )
}

export default ThemeToggle;