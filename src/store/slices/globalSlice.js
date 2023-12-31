import { createSlice } from '@reduxjs/toolkit';
import { getFromStorage } from '../../utils';

const initialState = {
  currentTheme: getFromStorage('theme') || 'dark',
  currentBoard: null
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    TOGGLE_THEME: (state, action) => {
      state.currentTheme = action.payload;
    }
  }
});

export const {
  TOGGLE_THEME
} = globalSlice.actions;

export default globalSlice.reducer;