import axios from 'axios';

const API_URL = 'https://localhost:7183/api';

const get = async (route) => {
  try {
    const response = await axios.get(`${API_URL}/${route}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting ${route}:`, error);
    throw error;
  }
};

const post = async (route, data, enfantsId) => {
  try {
    const processedData = { ...data };
    const params = new URLSearchParams();

    for (const key in processedData) {
      if (processedData[key] === '' && key.includes('date')) {
        processedData[key] = null;
      }
    }

    if (enfantsId)
      enfantsId.forEach((id) => {
        params.append('EnfantIds', id);
      });

    await axios.post(`${API_URL}/${route}`, processedData, { params });
    console.log(`posted to ${route} successfully`);
  } catch (error) {
    console.error(`Error posting data to ${route}:`, error.message);
    throw error;
  }
};

const put = async (route, data, enfantsId) => {
  try {
    const processedData = { ...data };
    const params = new URLSearchParams();

    if (enfantsId)
      enfantsId.forEach((id) => {
        params.append('EnfantIds', id);
      });

    for (const key in processedData) {
      if (processedData[key] === '' && key.includes('date')) {
        processedData[key] = null;
      }
    }
    await axios.put(`${API_URL}/${route}`, processedData, { params });
    console.log(`edited ${route} successfully`);
  } catch (error) {
    console.error(`Error puting data into ${route}:`, error.message);
    throw error;
  }
};

const login = async (creds) => {
  const token = 'your-mock-token';
  return fetch(`${API_URL}/Admin/login`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(creds),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Login request failed');
      }
      return response.json();
    })
    .then((data) => {
      if (data.message === 'success') {
        localStorage.setItem('token', token);
      } else if (data.message === 'invalid credentials') {
        throw new Error('Invalid credentials');
      }
    });
};

const logout = async () => {
  localStorage.removeItem('token');
};

export { post, put, login, logout };
export default get;
