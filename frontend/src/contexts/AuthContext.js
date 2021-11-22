import React, { createContext, useEffect, useState } from 'react';
import { axiosClient } from '../api/axiosClient';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userIconUrl, setUserIconUrl] = useState(null);

  useEffect(() => {
    axiosClient.get('/sessions/logged_in').then((res) => {
      setLoggedIn(res.data.logged_in);
      setUserName(res.data.user_name);
      setUserIconUrl(res.data.user_icon_url);
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
