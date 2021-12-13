import React, { useState, useEffect, useContext } from 'react';
import { FlashMessageContext } from '../contexts/FlashMessageContext';
import { axiosAuthClient } from '../api/axiosClient';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import defaultIcon from '../logo.svg';
import MDSpinner from 'react-md-spinner';
import FileUploadIcon from '@mui/icons-material/FileUpload';

const Setting = () => {
  const [inputValue, setInputValue] = useState(null);
  const [validationMessage, setValidationMessage] = useState({
    name: '',
    email: '',
  });
  const [icon, setIcon] = useState(null);
  const [preview, setPreview] = useState('');
  const updateFlashMessage = useContext(FlashMessageContext).updateFlashMessage;

  useEffect(async () => {
    axiosAuthClient.get('/users/me').then((res) => {
      const newInputValue = {
        name: '',
        email: '',
        twitter: '',
        github: '',
      };
      newInputValue.name = res.data.name;
      newInputValue.email = res.data.email;
      newInputValue.twitter = res.data.twitter ? res.data.twitter : '';
      newInputValue.github = res.data.github ? res.data.github : '';
      setInputValue(newInputValue);
      setPreview(
        res.data.upload_icon.url
          ? res.data.upload_icon.url
          : res.data.default_icon_url
      );
    });
  }, []);

  const updateProfile = async () => {
    const formData = new FormData();
    formData.append('user[name]', inputValue.name);
    formData.append('user[email]', inputValue.email);
    formData.append('user[twitter]', inputValue.twitter);
    formData.append('user[github]', inputValue.github);
    if (icon) formData.append('user[upload_icon]', icon);

    axiosAuthClient
      .patch('/users/me', formData)
      .then(() => {
        const newInputValue = Object.assign({}, inputValue);
        setInputValue(newInputValue);
        const newValidationMessage = {
          name: '',
          email: '',
        };
        setValidationMessage(newValidationMessage);
        updateFlashMessage({ successMessage: 'プロフィールを更新しました' });
      })
      .catch((err) => {
        if (err.response.status === 400) {
          const newValidationMessage = {
            name: '',
            email: '',
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
        更新する
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
        <FileUploadIcon />
        画像をアップロード
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
        label='TwitterID(@以降)'
        variant='outlined'
        style={{ width: '40ch', marginBottom: 30 }}
        value={props.inputValue.twitter}
        onChange={(e) => props.changeInputValue('twitter', e)}
      />
      <TextField
        label='GitHubID'
        variant='outlined'
        style={{ width: '40ch', marginBottom: 30 }}
        value={props.inputValue.github}
        onChange={(e) => props.changeInputValue('github', e)}
      />
    </Grid>
  );
};

export default Setting;
