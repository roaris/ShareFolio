import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import defaultIcon from '../logo.svg';

const Post = (props) => {
  const post = props.postAndUser.post;
  const appName = post.app_name;
  const description = post.description;
  const date = post.created_at.split('T')[0];

  const user = props.postAndUser.user;
  const userName = user.name;
  const userIconUrl = user.icon.url;

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
    post: {
      border: 'solid 1px',
      borderRadius: '10px',
      boxShadow: '0 0 3px gray',
      margin: 10,
      padding: 10,
    },
    appName: {
      fontSize: 30,
      textDecoration: 'none',
    },
    description: {
      fontSize: 15,
      overflowWrap: 'break-word',
    },
    postFooter: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    icon: {
      border: 'solid 1px',
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
    <div className={classes.post}>
      <Link className={classes.appName} href='/'>
        {appName}
      </Link>
      <Typography className={classes.description}>
        {previewDescription(description)}
      </Typography>
      <div className={classes.postFooter}>
        <Typography className={classes.date}>{date}に</Typography>
        <img
          src={userIconUrl ? userIconUrl : defaultIcon}
          className={classes.icon}
        />
        <Typography className={classes.userName}>
          <Link style={{ textDecoration: 'none' }} href='/'>
            {userName}
          </Link>
          が投稿
        </Typography>
      </div>
    </div>
  );
};

export default Post;
