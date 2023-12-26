import useEventListener from './useEventListener';

const useClickOutside = (refEl, handler, hungarian) => {
  useEventListener('click', e => {
    if (refEl.current && !refEl.current.contains(e.target) && hungarian) handler();
  });
}

export default useClickOutside;