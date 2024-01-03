import { useSelector } from 'react-redux';
import SidebarManage from './SidebarManage';
import SidebarBoardsList from './SidebarBoardsList';

const Sidebar = () => {
  const {sidebarIsVisible} = useSelector(store => store.global);

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