import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { FlashMessageContext } from '../contexts/FlashMessageContext';
import { axiosAuthClient } from '../api/axiosClient';
import { auth, githubProvider, googleProvider } from '../firebase';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
  const setLoggedIn = useContext(AuthContext).setLoggedIn;
  const setUserName = useContext(AuthContext).setUserName;
  const updateFlashMessage = useContext(FlashMessageContext).updateFlashMessage;
  const [errorMessage, setErrorMessage] = useState('')

  const createUser = (name, email, icon, token) => {
    axiosAuthClient
      .post('/users', {
        user: { name: name, email: email, icon: icon },
        token: token,
      })
      .then((res) => {
        setLoggedIn(true);
        setUserName(res.data.name);
        updateFlashMessage({ successMessage: 'ログインしました' });
      });
  };

  const githublogin = () => {
    auth.signInWithPopup(githubProvider).then((res) => {
      const name = res.additionalUserInfo.username;
      const email = res.user.email;
      const icon = res.user.photoURL;
      const token = res.user.Aa;
      createUser(name, email, icon, token);
    }).catch((err) => {
      if (err.code === 'auth/account-exists-with-different-credential') {
        setErrorMessage('既にこのメールアドレスは登録されています。違うログイン方法を選択してください。');
      }
    });
  };

  const googlelogin = () => {
    auth.signInWithPopup(googleProvider).then((res) => {
      const name = res.additionalUserInfo.profile.name;
      const email = res.user.email;
      const icon = res.user.photoURL;
      const token = res.user.Aa;
      createUser(name, email, icon, token);
    }).catch((err) => {
      if (err.code === 'auth/account-exists-with-different-credential') {
        setErrorMessage('既にこのメールアドレスは登録されています。違うログイン方法を選択してください。');
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
      <p style={{color: 'red'}}>{errorMessage}</p>
      <Button
        style={{
          backgroundColor: 'black',
          color: 'white',
          textTransform: 'none',
          width: 400,
        }}
        onClick={githublogin}
      >
        <GitHubIcon style={{ marginRight: 10 }} />
        GitHubでログイン
      </Button>
      <Button
        style={{
          border: 'solid 1px #bbb',
          textTransform: 'none',
          width: 400,
        }}
        onClick={googlelogin}
      >
        <GoogleIcon style={{ color: '#DC4A3D', marginRight: 10 }} />
        Googleでログイン
      </Button>
    </Grid>
  );
};

export default Login;
