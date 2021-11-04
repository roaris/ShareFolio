import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Link from '@material-ui/core/Link';

const Header = () => {
  const loggedIn = useContext(AuthContext).loggedIn;
  const setLoggedIn = useContext(AuthContext).setLoggedIn;
  const userName = useContext(AuthContext).userName;
  const setUserName = useContext(AuthContext).setUserName;
  const history = useHistory();

  const logout = () => {
    fetch(`${process.env.REACT_APP_API_URL}/sessions/logout`, {
      method: 'DELETE',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      credentials: 'include',
    }).then((res) => {
      if (res.status == 204) {
        setLoggedIn(false);
        setUserName(null);
        history.push('/login');
      }
    });
  };

  const headerStyle = {
    alignItems: 'center',
    backgroundColor: 'black',
    color: 'white',
    display: 'flex',
    height: 60,
    position: 'fixed',
    width: '100%',
    zIndex: 1,
  };

  const logoStyle = {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
    marginRight: 'auto',
  };

  const listItemStyle = {
    display: 'inline-block',
    listStyle: 'none',
    padding: 20,
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
  };

  return (
    <header style={headerStyle}>
      <div style={logoStyle}>ShareFolio</div>
      {loggedIn ? (
        <ul>
          <li style={listItemStyle}>
            <Link href='/setting' style={linkStyle}>
              <span>{userName}</span>
            </Link>
          </li>
          <li style={listItemStyle} onClick={logout}>
            <span style={{ cursor: 'pointer' }}>ログアウト</span>
          </li>
        </ul>
      ) : (
        <ul>
          <li style={listItemStyle}>
            <Link href='/login' style={linkStyle}>
              ログイン
            </Link>
          </li>
          <li style={listItemStyle}>
            <Link href='/signup' style={linkStyle}>
              新規登録
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Header;
