import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Link from '@material-ui/core/Link';

const Header = () => {
  const loggedIn = useContext(AuthContext).loggedIn;
  const userName = useContext(AuthContext).userName;

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
      <div style={logoStyle}>ポトみる！</div>
      {loggedIn ? (
        <ul>
          <li style={listItemStyle}>
            <Link href='/setting' style={linkStyle}>
              <span>{userName}</span>
            </Link>
          </li>
          <li style={listItemStyle}>ログアウト</li>
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
