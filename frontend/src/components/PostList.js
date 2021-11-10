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
    <div style={{ paddingTop: 50 }}>
      <div
        style={{
          borderBottom: 'solid 1px #bbb',
          margin: 30,
          textAlign: 'center',
        }}
      >
        <h1>投稿一覧({postAndUsers.length}件)</h1>
      </div>
      <Grid container>
        {postAndUsers.map((postAndUser) => (
          <Grid item xs={12} sm={12} md={6} key={postAndUser.post.id}>
            <Grid container key={postAndUser.post.id}>
              <Grid item xs={1} />
              <Grid item xs={10} style={{ marginBottom: 20 }}>
                <Post postAndUser={postAndUser} />
              </Grid>
              <Grid item xs={1} />
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default App;
