import React, { createContext, useEffect, useState } from 'react';
import { axiosAuthClient } from '../api/axiosClient';
import { auth } from '../firebase';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        axiosAuthClient.get(`/users/me`).then((res) => setUser(res.data));
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
