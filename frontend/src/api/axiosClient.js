import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
};

export const axiosClient = {
  get: (path) => {
    return axios.get(`${process.env.REACT_APP_API_URL}${path}`, {
      headers: headers,
      withCredentials: true,
    });
  },
  post: (path, data) => {
    return axios.post(`${process.env.REACT_APP_API_URL}${path}`, data, {
      headers: headers,
      withCredentials: true,
    });
  },
  patch: (path, data) => {
    return axios.patch(`${process.env.REACT_APP_API_URL}${path}`, data, {
      headers: headers,
      withCredentials: true,
    });
  },
  delete: (path) => {
    return axios.delete(`${process.env.REACT_APP_API_URL}${path}`, {
      headers: headers,
      withCredentials: true,
    })
  }
};
