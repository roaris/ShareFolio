import React, { useState, useMemo, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Owner from './Owner';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import CloseIcon from '@material-ui/icons/Close';
import CreateIcon from '@material-ui/icons/Create';

const CommentForm = (props) => {
  const [formOpen, setFormOpen] = useState(false);
  const userName = useContext(AuthContext).userName;
  const userIconUrl = useContext(AuthContext).userIconUrl;
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
          <Grid item xs={12} lg={1}>
            <div style={{marginTop: 10}}>
              <Owner userName={userName} userIconUrl={userIconUrl} />
            </div>
          </Grid>
          <Grid item xs={12} lg={11}>
            <SimpleMDE
              value={markdown}
              onChange={(e) => setMarkdown(e)}
              options={markdownOption}
            />
            <Grid container alignItems='center' justifyContent='center'>
              <Button variant='contained' color='primary' style={{marginRight: 50}} onClick={submitComment}>
                <SendIcon />
                送信
              </Button>
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
        <Button
          variant='contained'
          color='primary'
          onClick={() => setFormOpen(true)}
        >
          <CreateIcon />
          コメントする
        </Button>
      )}
    </Grid>
  );
};

export default CommentForm;
