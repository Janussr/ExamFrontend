import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import LandingPage from './components/LandingPage';
import User from './components/User';
import Admin from './components/Admin';
import NoMatch from './components/NoMatch';
import Conference from './components/Conference';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentRoles, setCurrentRoles] = useState([]);

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} currentRoles={currentRoles} setCurrentRoles={setCurrentRoles} onLogout={() => { localStorage.clear(); setIsLoggedIn(false) }} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        <Route path='landing-page' element={<LandingPage currentRoles={currentRoles} setCurrentRoles={setCurrentRoles} />} />
        <Route path='user' element={<User currentRoles={currentRoles} />} />
        <Route path='admin' element={<Admin currentRoles={currentRoles} />} />
        <Route path='*' element={<NoMatch />} />
        <Route path='conference' element={<Conference />} />
      </Routes>
    </div >
  );
}

export default App;
