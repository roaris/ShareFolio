import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Post from './components/Post';

const App = () => {
  const [posts, setPosts] = useState([]);

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

  return (
    <div>
      <Box p={3}>
        <Grid container spacing={4}>
          {posts.map(post =>
            <Grid item xs={4} key={post.id}>
              <Post title={post.title} content={post.content} />
            </Grid>
          )}
        </Grid>
      </Box>
    </div>
  );
}

export default App;
