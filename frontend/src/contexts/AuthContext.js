import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/logged_in`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      }
    })
      .then(res => res.json())
      .then(res => {
        setLoggedIn(res.logged_in)
      })
  }, [])

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
};

export default AuthContextProvider;
