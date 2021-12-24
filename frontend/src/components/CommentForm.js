import React, { useState, useMemo, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Owner from './Owner';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';

const CommentForm = (props) => {
  const [formOpen, setFormOpen] = useState(false);
  const loggedIn = useContext(AuthContext).loggedIn;
  const user = useContext(AuthContext).user;
  const [markdown, setMarkdown] = useState('');
  const markdownOption = useMemo(() => {
    return {
      toolbar: ['preview'],
      spellChecker: false,
    };
  }, []);

  const submitComment = () => {
    props.submitComment(markdown);
    setMarkdown('');
    setFormOpen(false);
  };

  return (
    <Grid container alignItems='center' justifyContent='center'>
      {formOpen ? (
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
                  onClick={submitComment}
                >
                  <SendIcon />
                  送信
                </Button>
              ) : (
                <Button
                  variant='contained'
                  disabled
                  style={{ marginRight: 50 }}
                  onClick={submitComment}
                >
                  <SendIcon />
                  送信
                </Button>
              )}
              <Button
                variant='contained'
                color='secondary'
                onClick={() => setFormOpen(false)}
              >
                <CloseIcon />
                キャンセル
              </Button>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <>
          {loggedIn ? (
            <Button
              variant='contained'
              color='primary'
              onClick={() => setFormOpen(true)}
            >
              <CreateIcon />
              コメントする
            </Button>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Button variant='contained' disabled>
                <CreateIcon />
                コメントする
              </Button>
              <Typography style={{ color: 'red', marginTop: 10 }}>
                ログインが必要です
              </Typography>
            </div>
          )}
        </>
      )}
    </Grid>
  );
};

export default CommentForm;
