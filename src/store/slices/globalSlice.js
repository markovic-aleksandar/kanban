import { createSlice } from '@reduxjs/toolkit';
import { getFromStorage } from '../../utils';

const initialState = {
  currentTheme: getFromStorage('theme') || 'dark',
  sidebarIsVisible: false,
  loader: true,
  modal: {leave: null, enter: null}
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
    },
    SHOW_MODAL: (state, action) => {
      state.modal = {leave: null, enter: action.payload};
    },
    HIDE_MODAL: state => {
      state.modal = {leave: null, enter: state.modal.enter};
    },
    SWITCH_MODAL: (state, action) => {
      state.modal = {leave: state.modal.enter, enter: action.payload || null};
    }
  }
});

export const {
  TOGGLE_THEME,
  TOGGLE_SIDEBAR_VISIBILITY,
  TOGGLE_LOADER,
  SHOW_MODAL,
  HIDE_MODAL,
  SWITCH_MODAL
} = globalSlice.actions;

export default globalSlice.reducer;