import './App.css';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import MassagesList from './pages/MassagesList';
import SidebarWithHeader from './components/SidebarWithHeader';

function App() {
  return (
    <>
      {/* <SidebarWithHeader /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/massages' element={<MassagesList />} />
      </Routes>
    </>
  );
}

export default App;
