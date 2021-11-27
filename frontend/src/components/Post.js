import Owner from './Owner';
import CreatedAt from './CreatedAt';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const Post = (props) => {
  const post = props.postAndUser.post;
  const appName = post.app_name;
  const description = post.description;

  const user = props.postAndUser.user;
  const userName = user.name;
  const userIconUrl = user.upload_icon.url
    ? user.upload_icon.url
    : user.default_icon_url;

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
    appName: {
      fontSize: 30,
      textDecoration: 'none',
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
          <Owner userId={user.id} userName={userName} userIconUrl={userIconUrl} />
        </div>
      </Grid>
      <Grid item xs={10} className={classes.postRight}>
        <Link className={classes.appName} href={`/posts/${post.id}`}>
          {appName}
        </Link>
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
