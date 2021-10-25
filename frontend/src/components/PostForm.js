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
      />
      2. デプロイ先のURLを入力してください。
      <TextField
        variant='outlined'
        style={{ width: 400, marginBottom: 30 }}
        value={inputValue.appUrl}
        onChange={(e) => changeInputValue('app_url', e)}
      />
      3. レポジトリのURLを入力してください。
      <TextField
        variant='outlined'
        style={{ width: 400, marginBottom: 30 }}
        value={inputValue.repoUrl}
        onChange={(e) => changeInputValue('repo_url', e)}
      />
      4. アプリの概要や工夫点を入力してください。
      <SimpleMDE value={markdown} onChange={(e) => setMarkdown(e)} />
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
