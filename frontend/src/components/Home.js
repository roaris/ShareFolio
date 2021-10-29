import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Post from './Post';

const App = () => {
  const [postAndUsers, setPostAndUsers] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/posts`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
      .then((res) => res.json())
      .then(setPostAndUsers);
  }, []);

  return (
    <div style={{ paddingTop: 100 }}>
      {postAndUsers.map((postAndUser) => (
        <Grid container key={postAndUser.post.id}>
          <Grid item xs={1} sm={1} md={3} lg={4} />
          <Grid item xs={10} sm={10} md={6} lg={4}>
            <Post postAndUser={postAndUser} />
          </Grid>
          <Grid item xs={1} sm={1} md={3} lg={4} />
        </Grid>
      ))}
    </div>
  );
};

export default App;
