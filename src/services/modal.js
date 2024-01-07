import { SHOW_MODAL, HIDE_MODAL, SWITCH_MODAL } from '../store/slices/globalSlice';
import { delayToHandle } from '../utils';

// show modal
export const showModal = (dispatch, modal) => {
  dispatch(SHOW_MODAL(modal));
}

// hide modal
export const hideModal = dispatch => {
  delayToHandle(() => dispatch(HIDE_MODAL()), 300);
}

// switch modal
export const switchModal = (dispatch, modal) => {
  dispatch(SWITCH_MODAL(modal));
  // hide modal
  hideModal(dispatch);
}

