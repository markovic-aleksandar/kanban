import { useSelector } from 'react-redux';
import useMediaQuery from '../../hooks/useMediaQuery';
import Loader from '../Loader';
import LogoDark from '../../assets/logo-dark.svg';
import LogoLight from '../../assets/logo-light.svg';
import LogoMobile from '../../assets/logo-mobile.svg';

const NavbarBoards = () => {
  let {currentTheme, loader} = useSelector(store => store.global);
  const {boards, currentBoard} = useSelector(store => store.board);
  const isMobile = useMediaQuery('mobile');
  
  return (
    <div className="Boards">
      <div className="Boards__logo">
        {isMobile ? (
          <img src={LogoMobile} alt="kanban" />
        ) : (
          <img src={currentTheme === 'dark' ? LogoLight : LogoDark} alt="kanban" />
        )}
      </div>
      <div className="Boards__name">
        {loader ? (
          <Loader variant="Navbar" />
        ) : (
          <h1>
            {boards.length < 1 ? 'No Board Found' : currentBoard?.name}
          </h1>
        )}
      </div>
    </div>
  )
}

export default NavbarBoards;