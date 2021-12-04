import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { axiosClient } from '../api/axiosClient';
import Grid from '@material-ui/core/Grid';
import Post from '../components/Post';
import MDSpinner from 'react-md-spinner';

const App = () => {
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const page = query.get('page');
  const [postAndUsers, setPostAndUsers] = useState(null);

  useEffect(() => {
    axiosClient
      .get(`/posts?page=${page}&per=10`)
      .then((res) => setPostAndUsers(res.data.posts_and_users));
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
        <h1>投稿一覧</h1>
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
