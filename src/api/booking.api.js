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

export const getAllBookings = () => {
  return axios.get(`${baseURL}/bookings`);
};

export const getBooking = id => {
  return axios.get(`${baseURL}/bookings/${id}`);
};

export const addBooking = booking => {
  return axios.post(`${baseURL}/bookings`, booking);
};

export const updateBooking = updatedBooking => {
  return axios.put(`${baseURL}/bookings/${updatedBooking._id}`, updatedBooking);
};

export const deleteBooking = id => {
  return axios.delete(`${baseURL}/bookings/${id}`);
};
