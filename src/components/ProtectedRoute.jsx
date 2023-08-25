// import { useEffect } from 'react';
// import Route from './Route';
// import Redirect from './Redirect';
// import { useAuthStateContext } from '../context/AuthContext';
// import { useNavigationContext } from '../context/NavigationContext';

// export default function ProtectedRoute({ children, path }) {
//   const { navigate } = useNavigationContext();
//   const { isAuth } = useAuthStateContext();
//   useEffect(() => {
//     console.log('inside protected route auth is ' + isAuth);
//     if (!isAuth) {
//       navigate('/login');
//     }
//   }, [isAuth]);
//   return isAuth ? <Route path={path}>{children}</Route> : <Redirect to="/login" />;
// }
