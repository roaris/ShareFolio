import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PostModal from './PostModal';
import EditForm from './EditForm';

const Post = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [inputValue, setInputValue] = useState({ title: '', content: '' });

  const toggleEditFormOpen = () => {
    setEditFormOpen(!editFormOpen);
  }

  const changeInputValue = (itemName, e) => {
    const newInputValue = Object.assign({}, inputValue);
    newInputValue[itemName] = e.target.value;
    setInputValue(newInputValue);
  };

  const updatePost = () => {
    props.updatePost(props.post.id, inputValue);
    toggleEditFormOpen();
    setInputValue({
      title: '',
      content: '',
    })
  };

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
            color='primary'
            onClick={toggleEditFormOpen}>
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
      {editFormOpen &&
      <EditForm
        inputValue={inputValue}
        changeInputValue={changeInputValue}
        updatePost={updatePost}
        post={props.post} />}
    </div>
  );
};

export default Post;
