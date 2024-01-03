import { useSelector } from 'react-redux';
import useMediaQuery from '../../hooks/useMediaQuery';
import LogoDark from '../../assets/logo-dark.svg';
import LogoLight from '../../assets/logo-light.svg';
import LogoMobile from '../../assets/logo-mobile.svg';

const NavbarBoards = () => {
  const {currentTheme} = useSelector(store => store.global);
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
      <h1 className="Boards__title">Platform Launch</h1>
    </div>
  )
}

export default NavbarBoards;