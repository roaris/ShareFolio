import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userIconUrl, setUserIconUrl] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/sessions/logged_in`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    }).then((res) => {
      if (res.status == 200) {
        res.json().then((res) => {
          setLoggedIn(res.logged_in);
          setUserName(res.user_name);
          setUserIconUrl(res.user_icon_url);
        });
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
