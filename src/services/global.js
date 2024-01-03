import { TOGGLE_THEME, TOGGLE_SIDEBAR_VISIBILITY } from '../store/slices/globalSlice';
import { addToStorage } from '../utils';

// toggle theme
export const toggleTheme = (dispatch, currentTheme) => {
  const newCurrentTheme = currentTheme === 'light' ? 'dark' : 'light';
  // dispatch toggle theme slice
  dispatch(TOGGLE_THEME(newCurrentTheme));

  // add current theme to storage
  addToStorage('theme', newCurrentTheme);
}

// show sidebar
export const showSidebar = dispatch => {
  dispatch(TOGGLE_SIDEBAR_VISIBILITY(true));
}

// hide sidebar
export const hideSidebar = dispatch => {
  dispatch(TOGGLE_SIDEBAR_VISIBILITY(false));
}