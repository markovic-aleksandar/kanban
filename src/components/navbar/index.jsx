import NavbarBoards from './NavbarBoards';
import NavbarManage from './NavbarManage';

const Navbar = () => {
  return (
    <header className="Navbar">
      <NavbarBoards />
      <NavbarManage />
    </header>
  )
}

export default Navbar;