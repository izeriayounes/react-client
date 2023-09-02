import axios from 'axios';
import { useState, useEffect, createContext, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const API_URL = 'https://localhost:7183/api';
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get(`${API_URL}/Admin/validate-token`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setIsAuth(true);
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            toast.error('Token is expired. Please log in.');
          } else {
            console.error('Token validation failed:', error);
          }
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth }}>
      {children}
      <ToastContainer position="bottom-left" autoClose={3000} />
    </AuthContext.Provider>
  );
}

export function useAuthStateContext() {
  return useContext(AuthContext);
}
