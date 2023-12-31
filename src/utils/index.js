// get media query
export const getMedia = mediaQuery => {
  return typeof window !== 'undefined' ? window.matchMedia(mediaQuery) : false;
}

// get from local storage
export const getFromStorage = key => {
  const localStorageItem = localStorage.getItem(`${import.meta.env.VITE_APP_NAME}-${key}`);
  return  localStorageItem ? JSON.parse(localStorageItem) : null;
}

// add to local storage
export const addToStorage = (key, value) => {
  localStorage.setItem(`${import.meta.env.VITE_APP_NAME}-${key}`, JSON.stringify(value));
}

// format api database queries
export const formatDatabaseQueries = (Query, queryOptions) => {
  const queries = [];
  
  if (queryOptions) {
    for (let queryOption in queryOptions) {
      queries.push(Query[queryOption](...queryOptions[queryOption]));
    }
  }
  
  return queries;
}