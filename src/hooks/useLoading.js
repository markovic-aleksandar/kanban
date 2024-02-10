import { useState } from 'react';

const useLoading = (initialLoading = false) => {
  const [isLoading, setIsLoading] = useState(initialLoading);

  // toggle loading
  const setLoading = loadingStatus => setIsLoading(loadingStatus);

  return {
    isLoading,
    setLoading
  }
}

export default useLoading;