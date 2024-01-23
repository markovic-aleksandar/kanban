import { createSlice } from '@reduxjs/toolkit';
import { getFromStorage } from '../../utils';

const initialState = {
  currentTheme: getFromStorage('theme') || 'dark',
  sidebarIsVisible: false,
  loader: true,
  modal: {leave: null, enter: null, data: null}
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
      const {modal, data} = action.payload;
      state.modal = {leave: null, enter: modal, data};
    },
    HIDE_MODAL: state => {
      state.modal = {leave: null, enter: state.modal.enter, data: null};
    },
    SWITCH_MODAL: (state, action) => {
      const {modal, data} = action.payload;
      state.modal = {leave: state.modal.enter, enter: modal, data};
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