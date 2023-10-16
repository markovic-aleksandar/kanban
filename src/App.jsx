import useMediaQuery from './hooks/useMediaQuery';
import { Navbar, Sidebar } from './layouts';

const App = () => {
  const isMobile = useMediaQuery('mobile');

  return (
    <>
      <Navbar />
      <main>
        {!isMobile && <Sidebar />}
      </main>
    </>
  )
}

export default App;