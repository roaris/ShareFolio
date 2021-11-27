import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { FlashMessageContext } from '../contexts/FlashMessageContext';
import { axiosAuthClient } from '../api/axiosClient';
import {
  auth,
  githubProvider,
  googleProvider,
  twitterProvider,
} from '../firebase';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CheckIcon from '@mui/icons-material/Check';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';

const Login = () => {
  const setLoggedIn = useContext(AuthContext).setLoggedIn;
  const setUserName = useContext(AuthContext).setUserName;
  const updateFlashMessage = useContext(FlashMessageContext).updateFlashMessage;
  const [errorMessage, setErrorMessage] = useState('');

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
    auth
      .signInWithPopup(githubProvider)
      .then((res) => {
        const name = res.additionalUserInfo.username;
        const email = res.user.email;
        const icon = res.user.photoURL;
        const token = res.user.Aa;
        createUser(name, email, icon, token);
      })
      .catch((err) => {
        if (err.code === 'auth/account-exists-with-different-credential') {
          setErrorMessage(
            '既にこのメールアドレスは登録されています。違うログイン方法を選択してください。'
          );
        }
      });
  };

  const googlelogin = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((res) => {
        const name = res.additionalUserInfo.profile.name;
        const email = res.user.email;
        const icon = res.user.photoURL;
        const token = res.user.Aa;
        createUser(name, email, icon, token);
      })
      .catch((err) => {
        if (err.code === 'auth/account-exists-with-different-credential') {
          setErrorMessage(
            '既にこのメールアドレスは登録されています。違うログイン方法を選択してください。'
          );
        }
      });
  };

  const twitterlogin = () => {
    auth
      .signInWithPopup(twitterProvider)
      .then((res) => {
        const name = res.user.displayName;
        const email = res.user.email;
        const icon = res.user.photoURL;
        const token = res.user.Aa;
        if (email === null) {
          auth.signOut();
          setErrorMessage(
            'このTwitterアカウントにはメールアドレスが登録されていません。アドレス登録後に再度お手続きをお願いします。'
          );
          return;
        }
        createUser(name, email, icon, token);
      })
      .catch((err) => {
        if (err.code === 'auth/account-exists-with-different-credential') {
          setErrorMessage(
            '既にこのメールアドレスは登録されています。違うログイン方法を選択してください。'
          );
        }
      });
  };

  const style = {
    paddingTop: 200,
  };

  return (
    <Grid container style={style}>
      <Grid item xs={2} md={4} />
      <Grid item xs={8} md={4}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          ログインすると以下のことができるようになります。
          <ul style={{ listStyle: 'none' }}>
            <li>
              <CheckIcon style={{ color: 'green', verticalAlign: 'middle' }} />
              <span style={{ verticalAlign: 'middle' }}>
                自分の作ったアプリの投稿
              </span>
            </li>
            <li>
              <CheckIcon style={{ color: 'green', verticalAlign: 'middle' }} />
              <span style={{ verticalAlign: 'middle' }}>
                他の人が作ったアプリへのコメント
              </span>
            </li>
          </ul>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <Button
            style={{
              backgroundColor: 'black',
              color: 'white',
              marginBottom: 20,
              textTransform: 'none',
            }}
            onClick={githublogin}
          >
            <GitHubIcon style={{ marginRight: 10 }} />
            GitHubでログイン / 新規登録
          </Button>
          <Button
            style={{
              border: 'solid 1px #bbb',
              marginBottom: 20,
              textTransform: 'none',
            }}
            onClick={googlelogin}
          >
            <GoogleIcon style={{ color: '#DC4A3D', marginRight: 10 }} />
            Googleでログイン / 新規登録
          </Button>
          <Button
            style={{
              backgroundColor: '#4099FF',
              color: 'white',
              textTransform: 'none',
            }}
            onClick={twitterlogin}
          >
            <TwitterIcon style={{ marginRight: 10 }} />
            Twitterでログイン / 新規登録
          </Button>
        </div>
      </Grid>
      <Grid item xs={2} md={4} />
    </Grid>
  );
};

export default Login;
