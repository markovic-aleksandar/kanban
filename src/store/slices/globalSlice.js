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
      const tempData = !data && !state.modal.data ? null : data && !state.modal.data ? {[modal]: data} : !data && state.modal.data ? state.modal.data : {...state.modal.data, [modal]: data};
      
      state.modal = {leave: null, enter: modal, data: tempData};
    },
    HIDE_MODAL: state => {
      let tempData = !state.modal.data || {};

      for (let i in state.modal.data) {
        if (i === state.modal.leave) {
          if (Object.keys(state.modal.data).length === 1) tempData = null;
          continue;
        }
        tempData[i] = state.modal.data[i];
      }

      state.modal = {...state.modal, leave: null, enter: state.modal.enter, data: tempData};
    },
    SWITCH_MODAL: (state, action) => {
      const {modal, data} = action.payload;
      const tempData = !data && !state.modal.data ? null : data && !state.modal.data ? {[modal]: data} : !data && state.modal.data ? state.modal.data : {...state.modal.data, [modal]: data};
      
      state.modal = {leave: state.modal.enter, enter: modal, data: tempData};
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