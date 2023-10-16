import { useEffect, useRef } from 'react';

const useEventListener = (type, handler, el = window) => {
  const savedHandler = useRef(null);

  // setup handler function
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  // add event to element
  useEffect(() => {
    if (!el) return;
    const listener = e => savedHandler.current(e);
    el.addEventListener(type, listener);

    return () => el.removeEventListener(type, listener);

  }, [type, el]);
}

export default useEventListener;