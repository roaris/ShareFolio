import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { FlashMessageContext } from '../contexts/FlashMessageContext';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

const Login = () => {
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const setLoggedIn = useContext(AuthContext).setLoggedIn;
  const setUserName = useContext(AuthContext).setUserName;
  const updateFlashMessage = useContext(FlashMessageContext).updateFlashMessage;

  const changeInputValue = (itemName, e) => {
    const newInputValue = Object.assign({}, inputValue);
    newInputValue[itemName] = e.target.value;
    setInputValue(newInputValue);
  };

  const login = () => {
    fetch(`${process.env.REACT_APP_API_URL}/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({ session: inputValue }),
      credentials: 'include',
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((res) => {
          setLoggedIn(true);
          setUserName(res.user_name);
          updateFlashMessage({ successMessage: 'ログインしました' });
        });
      } else if (res.status === 401) {
        setErrorMessage('Invalid email/password combination');
      }
    });
  };

  const style = {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 250,
  };

  return (
    <Grid container alignItems='center' justifyContent='center' style={style}>
      <Typography style={{ color: 'red', marginBottom: 30 }}>
        {errorMessage}
      </Typography>
      <TextField
        label='メールアドレス'
        variant='outlined'
        style={{ width: '40ch', marginBottom: 30 }}
        value={inputValue.email}
        onChange={(e) => changeInputValue('email', e)}
      />
      <TextField
        label='パスワード'
        type='password'
        variant='outlined'
        style={{ width: '40ch', marginBottom: 30 }}
        value={inputValue.password}
        onChange={(e) => changeInputValue('password', e)}
      />
      <Button
        variant='contained'
        color='primary'
        onClick={login}
        style={{ marginBottom: 30 }}
      >
        ログイン
      </Button>
      <Link href='/signup'>新規登録はこちら</Link>
    </Grid>
  );
};

export default Login;
