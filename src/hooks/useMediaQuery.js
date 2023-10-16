import { useState } from 'react';
import useEventListener from './useEventListener';
import { getMedia } from '../utils';

const useMediaQuery = query => {
  const currentQuery = query === 'mobile' ? '(max-width: 767px)' : query;
  const [isMatch, setIsMatch] = useState(getMedia(currentQuery).matches);

  // handle change media match
  const handleChangeMediaMatch = e => {
    setIsMatch(e.matches);
  }

  // add event listener window media query
  useEventListener('change', handleChangeMediaMatch, getMedia(currentQuery));

  return isMatch;
}

export default useMediaQuery;