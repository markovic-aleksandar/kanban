export const IconEllipsis = ({color = 'currentColor'}) => (
  <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg" style={{pointerEvents: 'none'}}>
    <g fill={color} fillRule="evenodd">
      <circle cx="2.308" cy="2.308" r="2.308"></circle>
      <circle cx="2.308" cy="10" r="2.308"></circle>
      <circle cx="2.308" cy="17.692" r="2.308"></circle>
    </g>
  </svg>
);

export const IconPlus = ({color = 'currentColor'}) => {
  return (
    <svg width='12' height='12' xmlns='http://www.w3.org/2000/svg'>
      <path fill={color} d='M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z' />
    </svg>
  )
}