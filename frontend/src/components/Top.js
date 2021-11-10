import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const Top = () => {
  const styles = makeStyles({
    top: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingTop: 50,
    },
    jumbotron: {
      backgroundColor: 'lightgray',
      fontSize: 'calc(1px + 3vmin)',
      padding: 30,
    }
  });

  const classes = styles();

  return (
    <div className={classes.top}>
      <Grid container>
        <Grid item xs={12} className={classes.jumbotron}>
          <h1>ShareFolio</h1>
          <p>ShareFolioはWebエンジニアを目指す人のためのポートフォリオプラットフォームです。</p>
        </Grid>
      </Grid>
      <div style={{ display: 'flex' }}>
        <Button
          to='/signup'
          component={Link}
          variant='contained'
          color='primary'
          style={{ marginRight: 10 }}
        >
          新規登録
        </Button>
        <Button
          to='/login'
          component={Link}
          variant='contained'
          color='primary'
        >
          ログイン
        </Button>
      </div>
    </div>
  );
};

export default Top;
