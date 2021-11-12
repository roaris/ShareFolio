import React, { useState, useMemo } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const PostForm = () => {
  const style = {
    display: 'flex',
    flexDirection: 'column',
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
  const markdownOption = useMemo(() => {
    return {
      toolbar: ['preview'],
      spellChecker: false,
    };
  }, []);

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
    <Grid container style={{paddingTop: 100}}>
      <Grid item xs={1} lg={3} />
      <Grid item xs={10} lg={6} style={style}>
        <p style={{ fontSize: 18, margin: 0 }}>1. アプリ名を入力してください。</p>
        <TextField
          variant='outlined'
          style={{ marginBottom: 30 }}
          value={inputValue.appName}
          onChange={(e) => changeInputValue('app_name', e)}
          error={validationMessage.app_name !== ''}
          helperText={validationMessage.app_name}
        />
        <p style={{ fontSize: 18, margin: 0 }}>2. デプロイ先のURLを入力してください。</p>
        <TextField
          variant='outlined'
          style={{ marginBottom: 30 }}
          value={inputValue.appUrl}
          onChange={(e) => changeInputValue('app_url', e)}
          error={validationMessage.app_url !== ''}
          helperText={validationMessage.app_url}
        />
        <p style={{ fontSize: 18, margin: 0 }}>3. レポジトリのURLを入力してください。</p>
        <TextField
          variant='outlined'
          style={{ marginBottom: 30 }}
          value={inputValue.repoUrl}
          onChange={(e) => changeInputValue('repo_url', e)}
          error={validationMessage.repo_url}
          helperText={validationMessage.repo_url}
        />
        <p style={{ fontSize: 18, margin: 0 }}>4. アプリの概要や工夫点を入力してください。</p>
        <SimpleMDE value={markdown} onChange={(e) => setMarkdown(e)} style={{width: '100%'}} options={markdownOption} />
        <p style={{ color: 'red', padding: 5 }}>
          {validationMessage.description}
        </p>
        <Grid container alignItems='center' justifyContent='center'>
          <Button
            variant='contained'
            color='primary'
            style={{ marginBottom: 30, width: 300 }}
            onClick={submitPost}
          >
            送信
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={1} lg={3} />
    </Grid>
  );
};

export default PostForm;
