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

  const [markdown, setMarkdown] = useState();

  return (
    <Grid container alignItems='center' justifyContent='center' style={style}>
      1. アプリ名を入力してください。
      <TextField variant='outlined' style={{ width: 400, marginBottom: 30 }} />
      2. デプロイ先のURLを入力してください。
      <TextField variant='outlined' style={{ width: 400, marginBottom: 30 }} />
      3. レポジトリのURLを入力してください。
      <TextField variant='outlined' style={{ width: 400, marginBottom: 30 }} />
      4. アプリの概要や工夫点を入力してください。
      <SimpleMDE value={markdown} onChange={(e) => setMarkdown(e)} />
      <Button variant='contained' color='primary' style={{ marginBottom: 30 }}>
        送信
      </Button>
    </Grid>
  );
};

export default PostForm;
