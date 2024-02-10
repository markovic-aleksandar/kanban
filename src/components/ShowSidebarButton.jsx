import { useDispatch } from 'react-redux';
import { showSidebar } from '../services/global';
import { IconShow } from '../constants/icons';

const ShowSidebarButton = () => {
  const dispatch = useDispatch();

  return (
    <button 
      type="button" 
      className="Main__show-sidebar--button"
      onClick={() => showSidebar(dispatch)}  
    >
      <IconShow />
    </button>
  )
}

export default ShowSidebarButton;