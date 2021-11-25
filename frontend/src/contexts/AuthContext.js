import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from '../firebase';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userIconUrl, setUserIconUrl] = useState(null);

  useEffect(async () => {
    const uid = await new Promise(resolve => auth.onAuthStateChanged(user => resolve(user?.uid)));
    if (uid) {
      setLoggedIn(true);
      const token = await auth.currentUser.getIdToken();
      axios
        .get(`${process.env.REACT_APP_API_URL}/users/search?uid=${uid}`, {
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUserName(res.data.user_name);
          setUserIconUrl(res.data.user_icon_url);
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
