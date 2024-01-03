import { createSlice } from '@reduxjs/toolkit';
import { getFromStorage } from '../../utils';

const initialState = {
  currentTheme: getFromStorage('theme') || 'dark',
  sidebarIsVisible: true
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
    INIT_APP_EL: (state, action) => {
      state.appEl = action.payload;
    }
  }
});

export const {
  TOGGLE_THEME,
  TOGGLE_SIDEBAR_VISIBILITY
} = globalSlice.actions;

export default globalSlice.reducer;