import logo from '../logo.svg';
import '../components/styles/logo.css';

const NotFound = () => {
  const style = {
    textAlign: 'center',
    backgroundColor: '#282c34',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(15px + 2vmin)',
    color: 'white',
  };

  return (
    <div style={style}>
      <img src={logo} className='App-logo' alt='logo' />
      <p>404 Page Not Found</p>
    </div>
  );
};

export default NotFound;
