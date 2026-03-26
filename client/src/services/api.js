import axios from 'axios';

const api = axios.create({
  baseURL: 'https://plant-care-website-backend.onrender.com/api', // adjust if using different port
})

api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

export default api;
