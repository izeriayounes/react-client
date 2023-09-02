import './styles/App.css';
import { EnfantCreate } from './pages/Enfant/EnfantForm';
import EnfantsList from './pages/Enfant/EnfantsList';
import { FamilleCreate } from './pages/Famille/FamilleForm';
import FamillesList from './pages/Famille/FamillesList';
import { ParrainCreate } from './pages/Parrain/ParrainForm';
import ParrainsList from './pages/Parrain/ParrainsList';
import ParrainageCreate from './pages/Parrainage/ParrainageCreate';
import ParrainagesList from './pages/Parrainage/ParrainagesList';
import Home from './pages/Home';
import Route from './components/Route';
import Sidebar from './components/Sidebar';
import Logout from './pages/Auth/Logout';
import Login from './pages/Auth/Login';
import { useAuthStateContext } from './context/AuthContext';
import { useEffect, useRef, useState } from 'react';
import { useNavigationContext } from './context/NavigationContext';

function App() {
  const { isAuth } = useAuthStateContext();
  const [isLoading, setIsLoading] = useState(true);
  const authRef = useRef(isAuth);
  const { currentPath } = useNavigationContext();

  useEffect(() => {
    authRef.current = isAuth;

    setTimeout(() => {
      setIsLoading(false);
      if (!authRef.current && currentPath !== '/login') window.history.pushState({}, '', '/login');
    }, 1000);

    if (currentPath === '/login' && authRef.current) {
      window.location.replace('/');
    }
  }, [isAuth, currentPath]);

  const isCreateComponent = currentPath.includes('/ajouter');

  return (
    !isLoading && (
      <div>
        <div className="container mx-auto">
          {isAuth && <Sidebar />}
          {isAuth && <Logout />}
          <div className={`ml-64 flex items-center justify-center ${!isCreateComponent && 'py-8'}`}>
            <Route path="/">{isAuth && <Home />}</Route>
            <Route path="/enfants">{isAuth && <EnfantsList />}</Route>
            <Route path="/familles">{isAuth && <FamillesList />}</Route>
            <Route path="/parrains">{isAuth && <ParrainsList />}</Route>
            <Route path="/parrainages">{isAuth && <ParrainagesList />}</Route>
          </div>
          <div className="md:pr-72 px-10 md:ml-64">
            <Route path="/enfants/ajouter">{isAuth && <EnfantCreate />}</Route>
            <Route path="/familles/ajouter">{isAuth && <FamilleCreate />}</Route>
            <Route path="/parrains/ajouter">{isAuth && <ParrainCreate />}</Route>
            <Route path="/parrainages/ajouter">{isAuth && <ParrainageCreate />}</Route>
          </div>
          {!isAuth && <Login />}
        </div>
      </div>
    )
  );
}

export default App;

