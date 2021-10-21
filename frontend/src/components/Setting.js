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
  const [icon, setIcon] = useState(null);
  const [updateIcon, setUpdateIcon] = useState(null);

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

  const changeInputValue = (itemName, e) => {
    const newInputValue = Object.assign({}, inputValue);
    newInputValue[itemName] = e.target.value;
    setInputValue(newInputValue);
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setUpdateIcon(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setUpdateIcon(null);
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
          <ImageRenderer
            icon={icon}
            updateIcon={updateIcon}
            onImageChange={onImageChange}
            removeImage={removeImage}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={5}>
          <InfoRenderer
            inputValue={inputValue}
            changeInputValue={changeInputValue}
          />
        </Grid>
      </Grid>
      <Button
        variant='contained'
        color='primary'
        style={{ width: 300, marginBottom: 30 }}
      >
        Update
      </Button>
    </Grid>
  );
};

const ImageRenderer = (props) => {
  const imageSource = () => {
    return props.updateIcon
      ? props.updateIcon
      : props.icon
      ? props.icon
      : defaultIcon;
  };

  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      justifyContent='center'
    >
      <img
        src={imageSource()}
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
          marginBottom: 10,
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
      <Button
        variant='contained'
        component='label'
        color='secondary'
        style={{
          width: 200,
          marginLeft: 10,
          marginBottom: 30,
        }}
        onClick={props.removeImage}
      >
        Remove
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
      />
      <TextField
        label='メールアドレス'
        variant='outlined'
        style={{ width: '40ch', marginBottom: 30 }}
        value={props.inputValue.email}
        onChange={(e) => props.changeInputValue('email', e)}
      />
      <TextField
        label='パスワード変更'
        type='password'
        variant='outlined'
        style={{ width: '40ch', marginBottom: 30 }}
        value={props.inputValue.password}
        onChange={(e) => props.changeInputValue('password', e)}
      />
      <TextField
        label='パスワード変更(確認)'
        type='password'
        variant='outlined'
        style={{ width: '40ch', marginBottom: 30 }}
        value={props.inputValue.password_confirmation}
        onChange={(e) => props.changeInputValue('password_confirmation', e)}
      />
    </Grid>
  );
};

export default Setting;
