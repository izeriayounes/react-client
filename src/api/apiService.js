import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = 'https://localhost:7183/api';

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = API_URL;

const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.config.method === 'put') {
      toast.success(`Modification réussite!`);
    } else if (response.config.method === 'post' && response.config.url !== '/Admin/login') {
      toast.success(`Création réussite`);
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      if (window.location.pathname !== '/login') {
        window.location.pathname = '/login';
      }
    }
    return Promise.reject(error);
  }
);

const token = localStorage.getItem('token');
setAuthToken(token);

const get = async (route) => {
  try {
    const response = await axiosInstance.get(route, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(`Error getting ${route}:`, error);
    throw error;
  }
};

const performPostOrPut = async (method, route, data, enfantsId) => {
  try {
    const processedData = { ...data };
    const params = new URLSearchParams();

    for (const key in processedData) {
      if (
        (processedData[key] === '' && key.includes('date')) ||
        (processedData[key] === '' && key.includes('number'))
      ) {
        processedData[key] = null;
      }
    }
    console.log(processedData);

    if (enfantsId) {
      enfantsId.forEach((id) => {
        params.append('EnfantIds', id);
      });
    }

    await axiosInstance[method](route, processedData, {
      params,
      withCredentials: true,
    });
    console.log(`${method === 'post' ? 'Posted to' : 'Edited'} ${route} successfully`);
  } catch (error) {
    console.error(`Error ${method === 'post' ? 'posting' : 'putting'} data to ${route}:`, error.message);
    throw error;
  }
};

const post = async (route, data, enfantsId) => {
  await performPostOrPut('post', route, data, enfantsId);
};

const put = async (route, data, enfantsId) => {
  await performPostOrPut('put', route, data, enfantsId);
};

const loadEnfantsWithNofamille = async () => {
  try {
    const response = await axiosInstance.get('/enfants/enfants-with-no-famille', {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(`Error getting enfant with no famille:`, error);
  }
};

const login = async (creds) => {
  try {
    const response = await axiosInstance.post('/Admin/login', creds);
    const token = response.data.token;
    localStorage.setItem('token', token);
    setAuthToken(token);
    return response.data;
  } catch (error) {
    console.error('Login error:', error.message);
    throw error;
  }
};

const logout = async () => {
  localStorage.removeItem('token');
  setAuthToken(null);
};

export { post, put, login, logout, loadEnfantsWithNofamille };
export default get;
