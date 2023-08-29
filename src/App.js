import './styles/App.css';
import { EnfantCreate } from './pages/Enfant/EnfantForm';
import EnfantsList from './pages/Enfant/EnfantsList';
import { FamilleCreate } from './pages/Famille/FamilleForm';
import FamillesList from './pages/Famille/FamillesList';
import { ParrainCreate } from './pages/Parrain/ParrainForm';
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
import { useNavigationContext } from './context/NavigationContext';

function App() {
  const { currentPath, navigate } = useNavigationContext();
  const { isAuth } = useAuthStateContext();
  const isAuthRef = useRef(isAuth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    isAuthRef.current = isAuth;
    setTimeout(() => {
      setIsLoading(false);
      if (!isAuthRef.current) window.history.pushState({}, '', '/login');
    }, 100);
  }, [isAuth]);

  useEffect(() => {
    if (isAuth && currentPath === '/login') {
      navigate('/');
    }
  }, [isAuth, currentPath, navigate]);

  if (isLoading) {
    return null;
  }

  return (
    <div>
      <div className="container mx-auto">
        {isAuth && window.location.pathname !== '/login' && (
          <>
            <Sidebar />
            <Logout />
            <div className="ml-64 flex items-center justify-center py-8">
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
            <div className="lg:pr-72 lg:px-10 ml-64 ">
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

