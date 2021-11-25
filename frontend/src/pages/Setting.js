import React, { useState, useEffect, useContext } from 'react';
import { FlashMessageContext } from '../contexts/FlashMessageContext';
import axios from 'axios';
import { auth } from '../firebase';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import defaultIcon from '../logo.svg';
import MDSpinner from 'react-md-spinner';

const Setting = () => {
  const [inputValue, setInputValue] = useState(null);
  const [validationMessage, setValidationMessage] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [icon, setIcon] = useState(null);
  const [preview, setPreview] = useState('');
  const updateFlashMessage = useContext(FlashMessageContext).updateFlashMessage;

  useEffect(async () => {
    const token = await auth.currentUser.getIdToken();
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/me`, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        const newInputValue = {
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
        };
        newInputValue.name = res.data.name;
        newInputValue.email = res.data.email;
        setInputValue(newInputValue);
        setPreview(res.data.icon.url);
      });
  }, []);

  const updateProfile = async () => {
    const formData = new FormData();
    formData.append('user[name]', inputValue.name);
    formData.append('user[email]', inputValue.email);
    formData.append('user[password]', inputValue.password);
    formData.append(
      'user[password_confirmation]',
      inputValue.password_confirmation
    );
    if (icon) formData.append('user[icon]', icon);

    const token = await auth.currentUser.getIdToken();
    axios
      .patch(`${process.env.REACT_APP_API_URL}/users/me`, formData, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then(() => {
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
        updateFlashMessage({ successMessage: 'プロフィールを更新しました' });
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

  const changeInputValue = (itemName, e) => {
    const newInputValue = Object.assign({}, inputValue);
    newInputValue[itemName] = e.target.value;
    setInputValue(newInputValue);
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];
    setIcon(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const isLoading = inputValue === null || preview === '';

  return isLoading ? (
    <div style={{ marginTop: 100, textAlign: 'center' }}>
      <MDSpinner size={70} />
    </div>
  ) : (
    <Grid
      container
      direction='column'
      alignItems='center'
      justifyContent='center'
      style={{ paddingTop: 150 }}
    >
      <Grid container alignItems='center' justifyContent='center'>
        <Grid item xs={12} sm={12} md={6} lg={5}>
          <ImageRenderer preview={preview} onImageChange={onImageChange} />
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
        src={props.preview ? props.preview : defaultIcon}
        style={{
          border: 'solid 1px #bbb',
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
