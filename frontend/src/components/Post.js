import Owner from './Owner';
import CreatedAt from './CreatedAt';
import Like from './Like';
import Tags from './Tags';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

const Post = (props) => {
  const post = props.postAndUser.post;
  const appName = post.app_name;
  const description = post.description;

  const user = props.postAndUser.user;
  const userName = user.name;
  const userIconUrl = user.icon_url;

  const previewDescription = (description) => {
    let result = '';
    for (let i = 0; i < description.length; i++) {
      const c = description[i];
      if (c == ' ' || c == '#') continue;
      result += c;
      if (result.length > 150) {
        result += '...';
        break;
      }
    }
    return result;
  };

  const styles = makeStyles({
    postRight: {
      border: 'solid 1px #bbb',
      borderRadius: '10px',
      padding: 10,
    },
    appNameAndLike: {
      alignItems: 'center',
      display: 'flex',
    },
    appName: {
      fontSize: 30,
      textDecoration: 'none',
    },
    like: {
      marginLeft: 'auto',
    },
    description: {
      fontSize: 15,
      overflowWrap: 'break-word',
      borderBottom: '1px solid #bbb',
    },
    postFooter: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: 5,
    },
    icon: {
      border: 'solid 1px #bbb',
      borderRadius: '50%',
      height: 25,
      width: 25,
    },
    date: {
      marginRight: 5,
      marginTop: 2,
      position: 'relative',
    },
    userName: {
      marginLeft: 5,
      marginTop: 2,
      position: 'relative',
    },
  });

  const classes = styles();

  return (
    <Grid container>
      <Grid item xs={2}>
        <div style={{ marginTop: 10 }}>
          <Owner
            userId={user.id}
            userName={userName}
            userIconUrl={userIconUrl}
          />
        </div>
      </Grid>
      <Grid item xs={10} className={classes.postRight}>
        <div className={classes.appNameAndLike}>
          <Link className={classes.appName} href={`/posts/${post.id}`}>
            {appName}
          </Link>
          <div className={classes.like}>
            <Like
              likeNum={post.like_num}
              numSize={20}
              likeFlag={post.like_flag}
              heartSize={25}
              createLike={() => {}}
              destroyLike={() => {}}
            />
          </div>
        </div>
        <div style={{ marginTop: 10, marginBottom: 10 }}>
          <Tags tags={post.tags} />
        </div>
        <Typography className={classes.description}>
          {previewDescription(description)}
        </Typography>
        <div className={classes.postFooter}>
          <CreatedAt createdAt={post.created_at} />
        </div>
      </Grid>
    </Grid>
  );
};

export default Post;
