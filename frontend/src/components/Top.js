import logo from '../logo.svg';
import './styles/logo.css';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const Top = () => {
  const style = {
    textAlign: 'center',
    backgroundColor: '#282c34',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(15px + 2vmin)',
    color: 'white'
  };

  return (
    <div style={style}>
      <img src={logo} className='App-logo' alt='logo' />
      <p>react_rails</p>
      <div style={{ display: 'flex' }}>
        <Button
          to='/signup'
          component={Link}
          variant='contained'
          color='primary'
          style={{marginRight: 10}}>
          新規登録
        </Button>
        <Button
          to='/login'
          component={Link}
          variant='contained'
          color='primary'>
          ログイン
        </Button>
      </div>
    </div>
  );
};

export default Top;
