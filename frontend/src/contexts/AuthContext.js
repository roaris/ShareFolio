import React, { createContext, useEffect, useState } from 'react';
import { axiosAuthClient } from '../api/axiosClient';
import { auth } from '../firebase';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userIconUrl, setUserIconUrl] = useState(null);

  useEffect(async () => {
    const uid = await new Promise((resolve) =>
      auth.onAuthStateChanged((user) => resolve(user?.uid))
    );
    if (uid) {
      setLoggedIn(true);
      axiosAuthClient.get(`/users/search?uid=${uid}`).then((res) => {
        setUserName(res.data.name);
        setUserIconUrl(res.data.icon.url);
      });
    } else {
      setLoggedIn(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ loggedIn, setLoggedIn, userName, setUserName, userIconUrl }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
