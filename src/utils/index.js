export const getMedia = mediaQuery => {
  return typeof window !== 'undefined' ? window.matchMedia(mediaQuery) : false;
}

export const getFromStorage = key => {
  const localStorageItem = localStorage.getItem(`${import.meta.env.VITE_APP_NAME}-${key}`);
  return  localStorageItem ? JSON.parse(localStorageItem) : null;
}

export const addToStorage = (key, value) => {
  localStorage.setItem(`${import.meta.env.VITE_APP_NAME}-${key}`, JSON.stringify(value));
}