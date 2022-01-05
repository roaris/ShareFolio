import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Owner from './Owner';
import CreatedAt from './CreatedAt';
import marked from 'marked';
import DOMPurify from 'dompurify';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';

const Comment = (props) => {
  const loginUser = useContext(AuthContext).user;

  const styles = makeStyles({
    comment: {
      marginBottom: 30,
    },
    commentRight: {
      border: 'solid 1px #bbb',
      borderRadius: '10px',
      overflowWrap: 'break-word',
      padding: 10,
    },
    commentRightFooter: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: 10,
    },
  });

  const classes = styles();

  return (
    <Grid container className={classes.comment}>
      <Grid item xs={2} lg={1}>
        <div style={{ marginTop: 10 }}>
          <Owner
            userId={props.commentAndUser.user.id}
            userName={props.commentAndUser.user.name}
            userIconUrl={props.commentAndUser.user.icon_url}
          />
        </div>
      </Grid>
      <Grid item xs={10} lg={11}>
        <div className={classes.commentRight}>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                marked(props.commentAndUser.comment.content)
              ),
            }}
            style={{ borderBottom: 'solid 1px #bbb' }}
          ></div>
          <div className={classes.commentRightFooter}>
            <CreatedAt createdAt={props.commentAndUser.comment.created_at} />
          </div>
        </div>
        {props.commentAndUser.user.id === loginUser.id && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <span style={{ marginRight: 10 }}>編集する</span>
            <span>削除する</span>
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default Comment;
