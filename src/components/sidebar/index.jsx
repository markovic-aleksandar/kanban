import SidebarManage from './SidebarManage';
import SidebarBoardsList from './SidebarBoardsList';
import LogoDark from '../../assets/logo-dark.svg';
import LogoLight from '../../assets/logo-light.svg';

const Sidebar = () => {
  return (
    <aside className="Sidebar">
      <div className="Sidebar__logo">
        <img src={LogoLight} alt="kanban" />
      </div>
      <div className="Sidebar__content">
        <SidebarBoardsList />
        <SidebarManage />
      </div>
    </aside>
  )
}

export default Sidebar;