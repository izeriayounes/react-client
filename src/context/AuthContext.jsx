import { useState, useEffect, createContext, useContext } from 'react';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuth(token === 'your-mock-token');
  }, []);

  return <AuthContext.Provider value={{ isAuth }}>{children}</AuthContext.Provider>;
}

export function useAuthStateContext() {
  return useContext(AuthContext);
}
