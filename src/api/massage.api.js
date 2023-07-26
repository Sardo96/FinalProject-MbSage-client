import axios from 'axios';
const baseURL = `${import.meta.env.VITE_MASSAGES_API}/api`;

const setAuthorizationHeaders = () => {
  axios.interceptors.request.use(config => {
    const storedToken = localStorage.getItem('authToken');

    if (storedToken) {
      config.headers = { Authorization: `Bearer ${storedToken}` };
    }

    return config;
  });
};

setAuthorizationHeaders();

export const getAllMassages = () => {
  return axios.get(`${baseURL}/massages`);
};

export const getMassage = id => {
  return axios.get(`${baseURL}/massages/${id}`);
};

export const addMassage = massage => {
  return axios.post(`${baseURL}/massages`, massage);
};

export const updateMassage = updatedMassage => {
  return axios.put(`${baseURL}/massages/${updatedMassage._id}`, updatedMassage);
};

export const deleteMassage = id => {
  return axios.delete(`${baseURL}/massages/${id}`);
};

export const addReview = review => {
  return axios.post(`${baseURL}/review`, review);
};

export const upload = uploadData => {
  return axios.post(`${baseURL}/upload`, uploadData);
};
