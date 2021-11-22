import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Signup = () => {
  const [inputValue, setInputValue] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [validationMessage, setValidationMessage] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const history = useHistory();
  const setLoggedIn = useContext(AuthContext).setLoggedIn;
  const setUserName = useContext(AuthContext).setUserName;

  const changeInputValue = (itemName, e) => {
    const newInputValue = Object.assign({}, inputValue);
    newInputValue[itemName] = e.target.value;
    setInputValue(newInputValue);
  };

  const createUser = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/users`,
        { user: inputValue },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        setLoggedIn(true);
        setUserName(res.data.name);
        history.push('/posts');
      })
      .catch((err) => {
        if (err.response.status === 400) {
          const newValidationMessage = {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
          };
          for (const property in err.response.data) {
            newValidationMessage[property] = err.response.data[property][0];
          }
          setValidationMessage(newValidationMessage);
        }
      });
  };

  const style = {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 200,
  };

  return (
    <Grid container alignItems='center' justifyContent='center' style={style}>
      <TextField
        label='ユーザー名'
        variant='outlined'
        style={{ width: '40ch', marginBottom: 30 }}
        value={inputValue.name}
        error={validationMessage.name !== ''}
        helperText={validationMessage.name}
        onChange={(e) => changeInputValue('name', e)}
      />
      <TextField
        label='メールアドレス'
        variant='outlined'
        style={{ width: '40ch', marginBottom: 30 }}
        value={inputValue.email}
        error={validationMessage.email !== ''}
        helperText={validationMessage.email}
        onChange={(e) => changeInputValue('email', e)}
      />
      <TextField
        label='パスワード'
        type='password'
        variant='outlined'
        style={{ width: '40ch', marginBottom: 30 }}
        value={inputValue.password}
        error={validationMessage.password !== ''}
        helperText={validationMessage.password}
        onChange={(e) => changeInputValue('password', e)}
      />
      <TextField
        label='パスワード(確認)'
        type='password'
        variant='outlined'
        style={{ width: '40ch', marginBottom: 30 }}
        value={inputValue.password_confirmation}
        error={validationMessage.password_confirmation !== ''}
        helperText={validationMessage.password_confirmation}
        onChange={(e) => changeInputValue('password_confirmation', e)}
      />
      <Button variant='contained' color='primary' onClick={createUser}>
        新規登録
      </Button>
    </Grid>
  );
};

export default Signup;
