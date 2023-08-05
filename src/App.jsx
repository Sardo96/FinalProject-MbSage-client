import { useState, useContext, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProfilePage from './pages/ProfilePage';
import NewMassage from './pages/AddMassage';
import MassageDetails from './pages/MassageDetails';
import MassagesList from './pages/Massages';
import MassageEdit from './pages/MassageEdit';
import './main.css';
import LandingPage from './pages/LandingPage';
import { ColorModeContext, tokens } from './context/theme.context';
import { ThemeProvider } from '@mui/material';
import { AuthContext } from './context/auth.context';
import IsAnon from './components/isAnon';
import IsPrivate from './components/isPrivate';
import About from './pages/About';
import Contacts from './pages/Contacts';

function App() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const { handleThemeChange: toggleColorMode, theme } =
    useContext(ColorModeContext);
  const colors = tokens(theme.palette.mode);
  const { pathname } = useLocation();
  const [background, setBackground] = useState(null);

  useEffect(() => {
    if (pathname === '/' || pathname === '/login' || pathname === '/signup') {
      setBackground('/images/homebackground.jpeg');
    } else {
      setBackground('white');
    }
  }, [pathname]);

  return (
    <div
      className='backgroundStyle'
      style={{
        background: `url(${background}) center center/cover no-repeat`
      }}
    >
      <Navbar />
      <ThemeProvider theme={theme}>
        <div className='app'>
          <main className='content'>
            <Routes>
              <Route path='/' element={<LandingPage />} />
              <Route
                path='/login'
                element={
                  <IsAnon>
                    <Login />
                  </IsAnon>
                }
              />
              <Route
                path='/signup'
                element={
                  <IsAnon>
                    <Signup />
                  </IsAnon>
                }
              />
              <Route
                path='/profile'
                element={
                  <IsPrivate>
                    <ProfilePage />
                  </IsPrivate>
                }
              />
              <Route path='/massages' element={<MassagesList />} />
              <Route
                path='/massages/new'
                element={
                  <IsPrivate>
                    <NewMassage />
                  </IsPrivate>
                }
              />
              <Route
                path='/massages/edit/:id/'
                element={
                  <IsPrivate>
                    <MassageEdit />
                  </IsPrivate>
                }
              />
              <Route path='/massages/:id' element={<MassageDetails />} />
              <Route path='/about' element={<About />} />
              <Route path='/contacts' element={<Contacts />} />

              {/* <Route path='/account/bookings' element={<BookingsPage />} />
        <Route path='/account/bookings/:id' element={<BookingPage />} /> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
