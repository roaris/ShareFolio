import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Post from '../components/Post';
import MDSpinner from 'react-md-spinner';

const App = () => {
  const [postAndUsers, setPostAndUsers] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/posts`, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        withCredentials: true,
      })
      .then((res) => setPostAndUsers(res.data));
  }, []);

  const isLoading = postAndUsers === null;

  return isLoading ? (
    <div style={{ paddingTop: 100, textAlign: 'center' }}>
      <MDSpinner size={70} />
    </div>
  ) : (
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
