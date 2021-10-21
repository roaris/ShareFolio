import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import defaultIcon from '../logo.svg';

const Setting = () => {
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
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const newInputValue = {
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
        };
        newInputValue.name = res.name;
        newInputValue.email = res.email;
        setInputValue(newInputValue);
        setIcon(res.icon);
      });
  }, []);

  const updateProfile = () => {
    const formData = new FormData();
    formData.append('user[name]', inputValue.name);
    formData.append('user[email]', inputValue.email);
    formData.append('user[password]', inputValue.password);
    formData.append(
      'user[password_confirmation]',
      inputValue.password_confirmation
    );
    if (icon) formData.append('user[icon]', icon);

    fetch(`${process.env.REACT_APP_API_URL}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: formData,
    }).then((res) => {
      if (res.status === 200) {
        const newInputValue = Object.assign({}, inputValue);
        newInputValue.password = '';
        newInputValue.password_confirmation = '';
        setInputValue(newInputValue);
        const newValidationMessage = {
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
        };
        setValidationMessage(newValidationMessage);
      } else if (res.status === 400) {
        res.json().then((err) => {
          const newValidationMessage = {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
          };
          for (const property in err) {
            newValidationMessage[property] = err[property][0];
          }
          setValidationMessage(newValidationMessage);
        });
      }
    });
  };

  const changeInputValue = (itemName, e) => {
    const newInputValue = Object.assign({}, inputValue);
    newInputValue[itemName] = e.target.value;
    setInputValue(newInputValue);
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setIcon(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      justifyContent='center'
      style={{ paddingTop: 150 }}
    >
      <Grid container alignItems='center' justifyContent='center'>
        <Grid item xs={12} sm={12} md={6} lg={5}>
          <ImageRenderer icon={icon} onImageChange={onImageChange} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={5}>
          <InfoRenderer
            inputValue={inputValue}
            changeInputValue={changeInputValue}
            validationMessage={validationMessage}
          />
        </Grid>
      </Grid>
      <Button
        variant='contained'
        color='primary'
        style={{ width: 300, marginBottom: 30 }}
        onClick={updateProfile}
      >
        Update
      </Button>
    </Grid>
  );
};

const ImageRenderer = (props) => {
  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      justifyContent='center'
    >
      <img
        src={props.icon ? props.icon : defaultIcon}
        style={{
          border: 'solid 1px',
          borderRadius: '50%',
          height: 300,
          width: 300,
          marginBottom: 20,
        }}
      />
      <Button
        variant='contained'
        component='label'
        color='primary'
        style={{
          width: 200,
          marginLeft: 10,
          marginBottom: 30,
        }}
      >
        Upload
        <input
          type='file'
          accept='image/*'
          hidden
          onChange={(e) => props.onImageChange(e)}
        />
      </Button>
    </Grid>
  );
};

const InfoRenderer = (props) => {
  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      justifyContent='center'
    >
      <TextField
        label='ユーザー名'
        variant='outlined'
        style={{ width: '40ch', marginBottom: 30 }}
        value={props.inputValue.name}
        onChange={(e) => props.changeInputValue('name', e)}
        error={props.validationMessage.name !== ''}
        helperText={props.validationMessage.name}
      />
      <TextField
        label='メールアドレス'
        variant='outlined'
        style={{ width: '40ch', marginBottom: 30 }}
        value={props.inputValue.email}
        onChange={(e) => props.changeInputValue('email', e)}
        error={props.validationMessage.email !== ''}
        helperText={props.validationMessage.email}
      />
      <TextField
        label='パスワード変更'
        type='password'
        variant='outlined'
        style={{ width: '40ch', marginBottom: 30 }}
        value={props.inputValue.password}
        onChange={(e) => props.changeInputValue('password', e)}
        error={props.validationMessage.password !== ''}
        helperText={props.validationMessage.password}
      />
      <TextField
        label='パスワード変更(確認)'
        type='password'
        variant='outlined'
        style={{ width: '40ch', marginBottom: 30 }}
        value={props.inputValue.password_confirmation}
        onChange={(e) => props.changeInputValue('password_confirmation', e)}
        error={props.validationMessage.password_confirmation !== ''}
        helperText={props.validationMessage.password_confirmation}
      />
    </Grid>
  );
};

export default Setting;
