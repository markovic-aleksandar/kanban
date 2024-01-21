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

// format dropdown options
export const formatDropdownOptions = initialOptions => {
  return initialOptions.map(initialOption => {
    return {
      value: initialOption.name.toLowerCase().replace(/\s+/g, '-'),
      label: initialOption.name,
      style: initialOption.style || null
    };
  });
}

// delay to handle 
export const delayToHandle = (delayFunction, delayValue) => {
  return new Promise(resolve => {
    const delayTimeout = setTimeout(() => {
      clearTimeout(delayTimeout);
      delayFunction();
      resolve();
    }, delayValue);
  });
}