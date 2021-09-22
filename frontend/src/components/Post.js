import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PostModal from './PostModal';

const Post = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div>
      <Card>
        <CardContent>
          <Typography style={{ fontSize: '25px' }}>{props.post.title}</Typography>
          <Typography style={{ wordWrap: "break-word" }}>{props.post.content}</Typography>
        </CardContent>
        <CardActions>
          <Button
            variant='contained'
            onClick={openModal}>
            Detail
          </Button>
          <Button
            variant='contained'
            color='primary'>
            Edit
          </Button>
          <Button
            variant='contained'
            color='secondary'>
            Delete
          </Button>
        </CardActions>
      </Card>
      <PostModal
        post={props.post}
        open={modalOpen}
        handleClose={closeModal}
      />
    </div>
  )
};

export default Post;
