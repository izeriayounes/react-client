import axios from 'axios';

const API_URL = 'https://localhost:7183/api';

const get = async (table) => {
  try {
    const response = await axios.get(`${API_URL}/${table}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting ${table}:`, error);
    throw error;
  }
};

const post = async (table, data, enfantsId) => {
  try {
    const params = new URLSearchParams();

    if (enfantsId)
      enfantsId.forEach((id) => {
        params.append('EnfantIds', id);
      });

    await axios.post(`${API_URL}/${table}`, data, { params });
    console.log(`added a ${table} successfully`);
  } catch (error) {
    console.error(`Error posting data to ${table}:`, error.message);
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

export { post, login, logout };
export default get;