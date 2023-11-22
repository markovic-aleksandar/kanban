import { ThemeToggle } from '../../components';
import { IconHide } from '../../constants/icons';

const SidebarManage = () => {
  return (
    <div className="Sidebar__manage">
      <ThemeToggle />
      <button type="button" className="Sidebar__hideButton">
        <IconHide />
        Hide Sidebar
      </button>
    </div>
  )
}

export default SidebarManage;