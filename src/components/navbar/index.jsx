import { useSelector } from 'react-redux';
import NavbarBoards from './NavbarBoards';
import NavbarManage from './NavbarManage';

const Navbar = () => {
  const {boards, currentBoard} = useSelector(store => store.board);

  return (
    <header className="Navbar">
      <NavbarBoards boards={boards} currentBoard={currentBoard} />
      {boards.length > 0 && currentBoard && <NavbarManage currentBoard={currentBoard} />}
    </header>
  )
}

export default Navbar;