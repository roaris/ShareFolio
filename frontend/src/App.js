import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CreateForm from './components/CreateForm';
import Post from './components/Post';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [inputValue, setInputValue] = useState({ title: '', content: '' });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_DEV_API_URL}/posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(setPosts)
  }, []);

  const changeInputValue = (itemName, e) => {
    const newInputValue = Object.assign({}, inputValue);
    newInputValue[itemName] = e.target.value;
    setInputValue(newInputValue)
  }

  const submitPost = () => {
    fetch(`${process.env.REACT_APP_DEV_API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputValue)
    })
      .then(res => res.json())
      .then(res => {
        const newPosts = posts.slice();
        newPosts.push(res);
        setPosts(newPosts);
        setInputValue(
          {
            title: '',
            content: '',
          }
        );
      })
  };

  const updatePost = (postId, updateValue) => {
    fetch(`${process.env.REACT_APP_DEV_API_URL}/posts/${postId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateValue)
    })
      .then(res => res.json())
      .then(res => {
        const newPosts = posts.slice();
        const index = newPosts.findIndex((post) => post.id === postId);
        newPosts.splice(index, 1, res);
        setPosts(newPosts);
      })
  };

  return (
    <div>
      <CreateForm
        inputValue={inputValue}
        changeInputValue={changeInputValue}
        submitPost={submitPost} />
      <Box p={3}>
        <Grid container spacing={4}>
          {posts.map(post =>
            <Grid item xs={4} key={post.id}>
              <Post post={post} updatePost={updatePost} />
            </Grid>
          )}
        </Grid>
      </Box>
    </div>
  );
}

export default App;
