import SidebarManage from './SidebarManage';
import SidebarBoardsList from './SidebarBoardsList';

const Sidebar = ({sidebarIsVisible}) => {
  return (
    <aside 
      className={sidebarIsVisible ? 'Sidebar Sidebar__is-visible' : 'Sidebar'}
    >
      <div className="Sidebar__content">
        <SidebarBoardsList />
        <SidebarManage />
      </div>
    </aside>
  )
}

export default Sidebar;