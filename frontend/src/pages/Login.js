import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { FlashMessageContext } from '../contexts/FlashMessageContext';
import { axiosAuthClient } from '../api/axiosClient';
import { auth, githubProvider } from '../firebase';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import GitHubIcon from '@mui/icons-material/GitHub';

const Login = () => {
  const setLoggedIn = useContext(AuthContext).setLoggedIn;
  const setUserName = useContext(AuthContext).setUserName;
  const updateFlashMessage = useContext(FlashMessageContext).updateFlashMessage;

  const login = () => {
    auth.signInWithPopup(githubProvider).then((res) => {
      const name = res.additionalUserInfo.username;
      const email = res.user.email;
      const icon = res.user.photoURL;
      const token = res.user.Aa;
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
    });
  };

  const style = {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 250,
  };

  return (
    <Grid container alignItems='center' justifyContent='center' style={style}>
      <Button
        style={{
          backgroundColor: 'black',
          color: 'white',
          textTransform: 'none',
          width: 400,
        }}
        onClick={login}
      >
        <GitHubIcon style={{ marginRight: 10 }} />
        GitHubでログイン
      </Button>
    </Grid>
  );
};

export default Login;
