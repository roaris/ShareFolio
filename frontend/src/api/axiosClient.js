import axios from 'axios';
import { auth } from '../firebase';

const headers = {
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
};

export const axiosClient = {
  get: async (path) => {
    const token = await auth.currentUser.getIdToken();
    return axios.get(`${process.env.REACT_APP_API_URL}${path}`, {
      headers: Object.assign({ 'Authorization': `Bearer ${token}` }, headers),
      withCredentials: true,
    });
  },
  post: async (path, data) => {
    const token = await auth.currentUser.getIdToken();
    return axios.post(`${process.env.REACT_APP_API_URL}${path}`, data, {
      headers: Object.assign({ 'Authorization': `Bearer ${token}` }, headers),
      withCredentials: true,
    });
  },
  patch: async (path, data) => {
    const token = await auth.currentUser.getIdToken();
    return axios.patch(`${process.env.REACT_APP_API_URL}${path}`, data, {
      headers: Object.assign({ 'Authorization': `Bearer ${token}` }, headers),
      withCredentials: true,
    });
  },
  delete: async (path) => {
    const token = await auth.currentUser.getIdToken();
    return axios.delete(`${process.env.REACT_APP_API_URL}${path}`, {
      headers: Object.assign({ 'Authorization': `Bearer ${token}` }, headers),
      withCredentials: true,
    })
  }
};
