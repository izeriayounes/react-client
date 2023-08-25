import './styles/App.css';
import EnfantCreate from './pages/Enfant/EnfantCreate';
import EnfantsList from './pages/Enfant/EnfantsList';
import FamilleCreate from './pages/Famille/FamilleCreate';
import FamillesList from './pages/Famille/FamillesList';
import ParrainCreate from './pages/Parrain/ParrainCreate';
import ParrainsList from './pages/Parrain/ParrainsList';
import ParrainagesList from './pages/Parrainage/ParrainagesList';
import ParrainageCreate from './pages/Parrainage/ParrainageCreate';
import Home from './pages/Home';
import Route from './components/Route';
import Sidebar from './components/Sidebar';
import Logout from './pages/Auth/Logout';
import Login from './pages/Auth/Login';
import { useEffect, useState, useRef } from 'react';
import { useAuthStateContext } from './context/AuthContext';

function App() {
  const [shouldShowButton, setShouldShowButton] = useState(true);
  const prevScrollPos = 0;
  const { isAuth } = useAuthStateContext();
  const isAuthRef = useRef(isAuth);
  const prevScrollPosRef = useRef(prevScrollPos);

  const handleScroll = () => {
    window.requestAnimationFrame(() => {
      const currentScrollPos = window.scrollY;
      const shouldShow = currentScrollPos < 18 || currentScrollPos <= prevScrollPos;
      setShouldShowButton(shouldShow);
      prevScrollPosRef.current = currentScrollPos;
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  isAuth && console.log('yo its already: ' + isAuthRef.current);

  useEffect(() => {
    isAuthRef.current = isAuth;
    setTimeout(() => {
      if (!isAuthRef.current) window.history.pushState({}, '', '/login');
    }, 100);
  }, [isAuth]);

  return (
    <div>
      <div className="container mx-auto bg-gray-100">
        {isAuth && window.location.pathname !== '/login' && (
          <>
            <Sidebar />
            {shouldShowButton && <Logout />}
            <div className="ml-64 flex items-center justify-center pt-4">
              <Route path={'/'}>
                <Home />
              </Route>
              <Route path={'/enfants'}>
                <EnfantsList />
              </Route>
              <Route path={'/familles'}>
                <FamillesList />
              </Route>
              <Route path={'/parrains'}>
                <ParrainsList />
              </Route>
              <Route path={'/parrainages'}>
                <ParrainagesList />
              </Route>
            </div>
            <div className="lg:pr-72 lg:py-10 lg:px-10 sm:px-5 ml-64">
              <Route path={'/enfants/ajouter'}>
                <EnfantCreate />
              </Route>
              <Route path={'/familles/ajouter'}>
                <FamilleCreate />
              </Route>
              <Route path={'/parrains/ajouter'}>
                <ParrainCreate />
              </Route>
              <Route path={'/parrainages/ajouter'}>
                <ParrainageCreate />
              </Route>
            </div>
          </>
        )}
      </div>

      <Route path={'/login'}>
        <Login />
      </Route>
      {!isAuth && <Login />}
    </div>
  );
}

export default App;

