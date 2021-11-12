import Owner from './Owner';
import CreatedAt from './CreatedAt';
import marked from 'marked';
import DOMPurify from 'dompurify';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const CommentList = (props) => {
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
    <div>
      {props.commentsAndUsers.length ? (
        <h2>コメント一覧({props.commentsAndUsers.length}件)</h2>
      ) : (
        <h2>コメントはまだありません</h2>
      )}
      {props.commentsAndUsers.map((commentAndUser, i) => (
        <Grid container key={i} className={classes.comment}>
          <Grid item xs={2} lg={1}>
            <div style={{ marginTop: 10 }}>
              <Owner
                userName={commentAndUser.user_name}
                userIconUrl={commentAndUser.user_icon_url}
              />
            </div>
          </Grid>
          <Grid item xs={10} lg={11} className={classes.commentRight}>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  marked(commentAndUser.comment.content)
                ),
              }}
              style={{ borderBottom: 'solid 1px #bbb' }}
            ></div>
            <div className={classes.commentRightFooter}>
              <CreatedAt createdAt={commentAndUser.comment.created_at} />
            </div>
          </Grid>
        </Grid>
      ))}
    </div>
  );
};

export default CommentList;
