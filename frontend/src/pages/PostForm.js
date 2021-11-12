import React, { useState } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const PostForm = () => {
  const style = {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 100,
  };

  const [inputValue, setInputValue] = useState({
    app_name: '',
    app_url: '',
    repo_url: '',
  });
  const [validationMessage, setValidationMessage] = useState({
    app_name: '',
    app_url: '',
    repo_url: '',
    description: '',
  });
  const [markdown, setMarkdown] = useState();

  const changeInputValue = (itemName, e) => {
    const newInputValue = Object.assign({}, inputValue);
    newInputValue[itemName] = e.target.value;
    setInputValue(newInputValue);
  };

  const submitPost = () => {
    fetch(`${process.env.REACT_APP_API_URL}/posts`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({
        post: Object.assign({}, inputValue, { description: markdown }),
      }),
    }).then((res) => {
      if (res.status === 400) {
        res.json().then((err) => {
          const newValidationMessage = {
            app_name: '',
            app_url: '',
            repo_url: '',
            description: '',
          };
          for (const property in err) {
            newValidationMessage[property] = err[property][0];
          }
          setValidationMessage(newValidationMessage);
        });
      }
    });
  };

  return (
    <Grid container alignItems='center' justifyContent='center' style={style}>
      1. アプリ名を入力してください。
      <TextField
        variant='outlined'
        style={{ width: 400, marginBottom: 30 }}
        value={inputValue.appName}
        onChange={(e) => changeInputValue('app_name', e)}
        error={validationMessage.app_name !== ''}
        helperText={validationMessage.app_name}
      />
      2. デプロイ先のURLを入力してください。
      <TextField
        variant='outlined'
        style={{ width: 400, marginBottom: 30 }}
        value={inputValue.appUrl}
        onChange={(e) => changeInputValue('app_url', e)}
        error={validationMessage.app_url !== ''}
        helperText={validationMessage.app_url}
      />
      3. レポジトリのURLを入力してください。
      <TextField
        variant='outlined'
        style={{ width: 400, marginBottom: 30 }}
        value={inputValue.repoUrl}
        onChange={(e) => changeInputValue('repo_url', e)}
        error={validationMessage.repo_url}
        helperText={validationMessage.repo_url}
      />
      4. アプリの概要や工夫点を入力してください。
      <SimpleMDE value={markdown} onChange={(e) => setMarkdown(e)} />
      <p style={{ color: 'red', padding: 5 }}>
        {validationMessage.description}
      </p>
      <Button
        variant='contained'
        color='primary'
        style={{ marginBottom: 30 }}
        onClick={submitPost}
      >
        送信
      </Button>
    </Grid>
  );
};

export default PostForm;
