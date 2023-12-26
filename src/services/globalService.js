import { TOGGLE_THEME } from '../store/slices/globalSlice';
import { addToStorage } from '../utils';

// toggle theme
export const toggleTheme = (dispatch, currentTheme) => {
  const newCurrentTheme = currentTheme === 'light' ? 'dark' : 'light';
  // dispatch toggle theme slice
  dispatch(TOGGLE_THEME(newCurrentTheme));

  // add current theme to storage
  addToStorage('theme', newCurrentTheme);
}