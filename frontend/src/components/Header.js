import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { FlashMessageContext } from '../contexts/FlashMessageContext';
import { auth } from '../firebase';
import Link from '@mui/material/Link';
import CreateIcon from '@mui/icons-material/Create';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

const Header = () => {
  const loggedIn = useContext(AuthContext).loggedIn;
  const setLoggedIn = useContext(AuthContext).setLoggedIn;
  const user = useContext(AuthContext).user;
  const updateFlashMessage = useContext(FlashMessageContext).updateFlashMessage;
  const history = useHistory();

  const logout = () => {
    auth.signOut().then(() => {
      setLoggedIn(false);
      updateFlashMessage({ successMessage: 'ログアウトしました' });
      history.push('/');
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
            <Link href='/posts/new' style={linkStyle}>
              <CreateIcon style={{ verticalAlign: 'middle' }} />
              <span style={{ verticalAlign: 'middle' }}>新規投稿</span>
            </Link>
          </li>
          <li style={listItemStyle}>
            <Link href={`/users/${user.id}`} style={linkStyle}>
              <PersonIcon style={{ verticalAlign: 'middle' }} />
              <span style={{ verticalAlign: 'middle' }}>{user.name}</span>
            </Link>
          </li>
          <li style={listItemStyle} onClick={logout}>
            <LogoutIcon style={{ verticalAlign: 'middle' }} />
            <span style={{ cursor: 'pointer', verticalAlign: 'middle' }}>
              ログアウト
            </span>
          </li>
        </ul>
      ) : (
        <ul>
          <li style={listItemStyle}>
            <Link href='/login' style={linkStyle}>
              <LoginIcon style={{ verticalAlign: 'middle' }} />
              <span style={{ verticalAlign: 'middle' }}>
                ログイン / 新規登録
              </span>
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Header;
