import useMediaQuery from './hooks/useMediaQuery';
import { Navbar, Sidebar, Board } from './layouts';
import ScrollContainer from 'react-indiana-drag-scroll';

const App = () => {
  const isMobile = useMediaQuery('mobile');

  return (
    <>
      <Navbar />
      <ScrollContainer
        nativeMobileScroll={true}
        vertical={false}
        hideScrollbars={false}
        // onScroll={handleBoardScroll}
        component="main"
        className="Main"
        >
        {!isMobile && <Sidebar />}  
        <Board />
      </ScrollContainer>
    </>
  )
}

export default App;