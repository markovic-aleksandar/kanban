import { useSelector } from 'react-redux';
import NavbarBoards from './NavbarBoards';
import NavbarManage from './NavbarManage';

const Navbar = () => {
  const {boards} = useSelector(store => store.board);

  return (
    <header className="Navbar">
      <NavbarBoards />
      {boards.length > 0 && <NavbarManage />}
    </header>
  )
}

export default Navbar;