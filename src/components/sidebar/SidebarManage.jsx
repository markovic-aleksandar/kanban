import { useDispatch } from 'react-redux';
import { hideSidebar } from '../../services/global';
import { ThemeToggle } from '..';
import { IconHide } from '../../constants/icons';

const SidebarManage = () => {
  const dispatch = useDispatch();

  return (
    <div className="Sidebar__manage">
      <ThemeToggle />
      <button 
        type="button" 
        className="Sidebar__hide-sidebar"
        onClick={() => hideSidebar(dispatch)}
      >
        <IconHide />
        Hide Sidebar
      </button>
    </div>
  )
}

export default SidebarManage;