import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../services/global';
import { IconSun, IconMoon } from '../constants/icons';

const ThemeToggle = () => {
  const {currentTheme} = useSelector(store => store.global);
  const dispatch = useDispatch();

  return (
    <div className={`ThemeToggle ThemeToggle__${currentTheme}`}>
      <span className="ThemeToggle__icon">
        <IconSun />
      </span>
      <button 
        type="button" 
        className="ThemeToggle__button"
        onClick={() => toggleTheme(dispatch, currentTheme)}
      >
        <span></span>  
      </button>
      <span className="ThemeToggle__icon">
        <IconMoon />
      </span>
    </div>
  )
}

export default ThemeToggle;