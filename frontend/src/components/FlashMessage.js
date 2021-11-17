import { useContext } from 'react';
import { FlashMessageContext } from '../contexts/FlashMessageContext';
import { makeStyles } from '@material-ui/core/styles';

const FlashMessage = () => {
  const flashMessage = useContext(FlashMessageContext).flashMessage;
  const isOpen = useContext(FlashMessageContext).isOpen;

  const styles = makeStyles({
    outer: {
      marginTop: 50,
      position: 'fixed',
      width: '100%',
      zIndex: 2,
    },
    flashMessage: {
      backgroundColor: flashMessage.success ? '#DFF0D8' : '#F2DEDE',
      borderRadius: 20,
      margin: 'auto',
      opacity: isOpen ? 1 : 0,
      padding: '10px 0px',
      transition: 'all 1s',
      textAlign: 'center',
      width: 400,
    },
    successMessage: {
      color: '#3C763D',
    },
    errorMessage: {
      color: '#A94442',
    },
  });

  const classes = styles();

  return (
    <div className={classes.outer}>
      <div className={classes.flashMessage}>
        {flashMessage.success && (
          <span className={classes.successMessage}>{flashMessage.success}</span>
        )}
        {flashMessage.error && (
          <span className={classes.errorMessage}>{flashMessage.error}</span>
        )}
      </div>
    </div>
  );
};

export default FlashMessage;
