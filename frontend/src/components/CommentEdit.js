import React, { useState, useMemo, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Owner from './Owner';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

const CommentEdit = (props) => {
  const user = useContext(AuthContext).user;
  const [markdown, setMarkdown] = useState(props.defaultMarkdown);
  const markdownOption = useMemo(() => {
    return {
      toolbar: ['preview'],
      spellChecker: false,
    };
  }, []);

  const editComment = () => {
    props.editComment(markdown);
    setMarkdown('');
    props.handleClose();
  };

  return (
    <Grid container>
      <Grid item xs={2} lg={1}>
        <div style={{ marginTop: 10 }}>
          <Owner
            userId={user.id}
            userName={user.name}
            userIconUrl={user.icon_url}
          />
        </div>
      </Grid>
      <Grid item xs={10} lg={11}>
        <SimpleMDE
          value={markdown}
          onChange={(e) => setMarkdown(e)}
          options={markdownOption}
        />
        <Grid container alignItems='center' justifyContent='center'>
          {markdown.length > 0 ? (
            <Button
              variant='contained'
              color='primary'
              style={{ marginRight: 50 }}
              onClick={editComment}
            >
              <SendIcon />
              更新
            </Button>
          ) : (
            <Button variant='contained' disabled style={{ marginRight: 50 }}>
              <SendIcon />
              更新
            </Button>
          )}
          <Button
            variant='contained'
            color='secondary'
            onClick={props.handleClose}
          >
            <CloseIcon />
            キャンセル
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CommentEdit;
