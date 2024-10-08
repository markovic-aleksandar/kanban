import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useMediaQuery from './hooks/useMediaQuery';
import { setBoards } from './services/board';
import { Navbar, Sidebar, Board, ShowSidebarButton, Modal } from './components';
import ScrollContainer from 'react-indiana-drag-scroll';

const App = () => {
  const {currentTheme, sidebarIsVisible, loader, modal} = useSelector(store => store.global);
  const isMobile = useMediaQuery('mobile');
  const dispatch = useDispatch();

  // set boards
  useEffect(() => {
    setBoards(dispatch);
  }, [dispatch]);

  return (
    <div className={`App App__${currentTheme}`}>
      <Navbar />
      <ScrollContainer
        nativeMobileScroll={true}
        vertical={false}
        hideScrollbars={false}
        ignoreElements={'.Board__task'}
        component="main"
        className="Main"
      >
        {!isMobile && <Sidebar sidebarIsVisible={sidebarIsVisible} />} 
        <Board />
        {!isMobile && !sidebarIsVisible && !loader && <ShowSidebarButton />}
      </ScrollContainer>
      {(modal.leave || modal.enter) && <Modal modal={modal} />}
    </div>
  )
}

export default App;