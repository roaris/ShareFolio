import { makeStyles } from '@material-ui/core/styles';

const UserDetail = (props) => {
  const { params } = props.match;
  const id = parseInt(params.id, 10);
  const styles = makeStyles({
    user: {
      paddingTop: 150,
    }
  });

  const classes = styles();

  return (
    <div className={classes.user}>
      <h1>User{id}</h1>
    </div>
  );
}

export default UserDetail;
