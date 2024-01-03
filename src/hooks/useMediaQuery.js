import { useState, useEffect } from 'react';
import useEventListener from './useEventListener';
import { getMedia } from '../utils';

const useMediaQuery = query => {
  const currentQuery = query === 'mobile' ? '(max-width: 767px)' : query;
  const [isMatch, setIsMatch] = useState(getMedia(currentQuery).matches);
  const [mediaQueryList, setMediaQueryList] = useState(getMedia(currentQuery));

  // handle change media match
  const handleChangeMediaMatch = e => {
    setIsMatch(e.matches);
  }

  useEffect(() => {
    const list = getMedia(currentQuery);
    setIsMatch(list.matches);
    setMediaQueryList(list);
  }, [currentQuery]);

  useEventListener('change', handleChangeMediaMatch, mediaQueryList)

  return isMatch;
}

export default useMediaQuery;