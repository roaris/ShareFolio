import { makeStyles } from '@material-ui/core/styles';
import logo from '../logo.svg';

const Owner = (props) => {
  const styles = makeStyles({
    owner: {
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
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
    <div className={classes.owner}>
      <img
        src={props.userIconUrl ? props.userIconUrl : logo}
        className={classes.icon}
      />
      <span className={classes.userName}>{props.userName}</span>
    </div>
  );
};

export default Owner;
