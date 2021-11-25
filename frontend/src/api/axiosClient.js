import axios from 'axios';
import { auth } from '../firebase';

const headers = {
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
};

export const axiosClient = {
  get: (path) => {
    return axios.get(`${process.env.REACT_APP_API_URL}${path}`, {
      headers: headers,
    });
  },
  post: (path, data) => {
    return axios.post(`${process.env.REACT_APP_API_URL}${path}`, data, {
      headers: headers,
    });
  },
  patch: (path, data) => {
    return axios.patch(`${process.env.REACT_APP_API_URL}${path}`, data, {
      headers: headers,
    });
  },
  delete: (path) => {
    return axios.delete(`${process.env.REACT_APP_API_URL}${path}`, {
      headers: headers,
    })
  }
};

const AuthorizationHeader = async () => {
  const token = await auth.currentUser.getIdToken();
  return { 'Authorization': `Bearer ${token}` };
}

export const axiosAuthClient = {
  get: async (path) => {
    return axios.get(`${process.env.REACT_APP_API_URL}${path}`, {
      headers: Object.assign({}, headers, await AuthorizationHeader()),
    });
  },
  post: async (path, data) => {
    return axios.post(`${process.env.REACT_APP_API_URL}${path}`, data, {
      headers: Object.assign({}, headers, await AuthorizationHeader()),
    });
  },
  patch: async (path, data) => {
    return axios.patch(`${process.env.REACT_APP_API_URL}${path}`, data, {
      headers: Object.assign({}, headers, await AuthorizationHeader()),
    });
  },
  delete: async (path) => {
    return axios.delete(`${process.env.REACT_APP_API_URL}${path}`, {
      headers: Object.assign({}, headers, await AuthorizationHeader()),
    })
  }
};

