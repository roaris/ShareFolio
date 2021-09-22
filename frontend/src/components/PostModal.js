import Modal from '@material-ui/core/Modal'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

const PostModal = (props) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <Box sx={style}>
        <Typography style={{ fontSize: '25px' }}>{props.post.title}</Typography>
        <Typography style={{ wordWrap: 'break-word' }}>{props.post.content}</Typography>
        <Typography>作成日時: {props.post.created_at}</Typography>
        <Typography>更新日時: {props.post.updated_at}</Typography>
      </Box>
    </Modal>
  );
};

export default PostModal;
