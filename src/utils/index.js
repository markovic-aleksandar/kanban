export const getMedia = mediaQuery => {
  return typeof window !== 'undefined' ? window.matchMedia(mediaQuery) : false;
}