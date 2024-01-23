import { SHOW_MODAL, HIDE_MODAL, SWITCH_MODAL } from '../store/slices/globalSlice';
import { delayToHandle } from '../utils';

// show modal
export const showModal = (dispatch, modal, data) => {
  dispatch(SHOW_MODAL({
    modal, 
    data: data || null
  }));
}

// hide modal
export const hideModal = dispatch => {
  delayToHandle(() => dispatch(HIDE_MODAL()), 300);
}

// switch modal
export const switchModal = (dispatch, modal, data) => {
  dispatch(SWITCH_MODAL({
    modal: modal || null,
    data: data || null
  }));
  // hide modal
  hideModal(dispatch);
}

