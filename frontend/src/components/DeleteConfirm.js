import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

const DeleteModal = (props) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{props.title}</DialogTitle>
      <DialogActions>
        <Button onClick={props.handleClose}>キャンセル</Button>
        <Button color='secondary' onClick={props.deletePost}>
          削除する
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
