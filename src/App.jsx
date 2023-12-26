import { useSelector } from 'react-redux';
import useMediaQuery from './hooks/useMediaQuery';
import { Navbar, Sidebar, Board } from './components';
import ScrollContainer from 'react-indiana-drag-scroll';

const App = () => {
  const {currentTheme} = useSelector(store => store.global);
  const isMobile = useMediaQuery('mobile');

  return (
    <div className={`App App__${currentTheme}`}>
      <Navbar />
      <ScrollContainer
        nativeMobileScroll={true}
        vertical={false}
        hideScrollbars={false}
        component="main"
        className="Main"
        >
        {!isMobile && <Sidebar />}  
        <Board />
      </ScrollContainer>
    </div>
  )
}

export default App;