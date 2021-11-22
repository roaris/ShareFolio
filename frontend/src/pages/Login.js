import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { FlashMessageContext } from '../contexts/FlashMessageContext';
import { axiosClient } from '../api/axiosClient';
import { auth } from '../firebase';
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

  const login = async () => {
    const uid = await new Promise((resolve) =>
      auth
        .signInWithEmailAndPassword(inputValue.email, inputValue.password)
        .then((res) => resolve(res.user.uid))
        .catch(() => {
          setErrorMessage('Invalid email/password combination');
        })
    );
    axiosClient.post('/users/search', { uid: uid }).then((res) => {
      setLoggedIn(true);
      setUserName(res.data.name);
      updateFlashMessage({ successMessage: 'ログインしました' });
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
