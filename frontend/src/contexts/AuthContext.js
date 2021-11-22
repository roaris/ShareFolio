import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userIconUrl, setUserIconUrl] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/sessions/logged_in`, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        withCredentials: true,
      })
      .then((res) => {
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
