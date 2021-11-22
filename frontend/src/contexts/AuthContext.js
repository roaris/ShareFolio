import React, { createContext, useEffect, useState } from 'react';
import { axiosClient } from '../api/axiosClient';
import { auth } from '../firebase';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userIconUrl, setUserIconUrl] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        axiosClient.post('/users/search', { uid: user.uid }).then((res) => {
          setLoggedIn(true);
          setUserName(res.data.name);
          setUserIconUrl(res.data.icon.url);
        });
      } else {
        setLoggedIn(false);
      }
    });
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
