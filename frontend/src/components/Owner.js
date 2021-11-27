import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const Owner = (props) => {
  const styles = makeStyles({
    owner: {
      color: 'black',
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'none',
      }
    },
    icon: {
      border: 'solid 1px #bbb',
      borderRadius: '50%',
      height: 50,
      margin: '0 auto',
      width: 50,
    },
    userName: {
      overflowWrap: 'break-word',
    },
  });

  const classes = styles();

  return (
    <Link href={`/users/${props.userId}`} className={classes.owner}>
      <img src={props.userIconUrl} className={classes.icon} />
      <span className={classes.userName}>{props.userName}</span>
    </Link>
  );
};

export default Owner;
