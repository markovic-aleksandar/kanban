import { createSlice } from '@reduxjs/toolkit';
import { getFromStorage } from '../../utils';

const initialState = {
  currentTheme: getFromStorage('theme') || 'dark',
  sidebarIsVisible: false,
  loader: true
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    TOGGLE_THEME: (state, action) => {
      state.currentTheme = action.payload;
    },
    TOGGLE_SIDEBAR_VISIBILITY: (state, action) => {
      state.sidebarIsVisible = action.payload;
    },
    TOGGLE_LOADER: (state, action) => {
      state.loader = action.payload;
    }
  }
});

export const {
  TOGGLE_THEME,
  TOGGLE_SIDEBAR_VISIBILITY,
  TOGGLE_LOADER
} = globalSlice.actions;

export default globalSlice.reducer;