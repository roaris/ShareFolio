import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { axiosClient, axiosAuthClient } from '../api/axiosClient';
import Grid from '@mui/material/Grid';
import Post from '../components/Post';
import MDSpinner from 'react-md-spinner';
import MuiPagination from '@mui/material/Pagination';
import { withStyles } from '@mui/styles';

const App = () => {
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const page = query.get('page') ? parseInt(query.get('page'), 10) : 1;
  const loggedIn = useContext(AuthContext).loggedIn;
  const [postAndUsers, setPostAndUsers] = useState(null);
  const [likeFlags, setLikeFlags] = useState(null);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(async () => {
    setPostAndUsers(null);
    setLikeFlags(null);

    const posts_and_users = await new Promise((resolve) => {
      axiosClient.get(`/posts?page=${page}&per=10`).then((res) => {
        setPostAndUsers(res.data.posts_and_users);
        setTotalPages(res.data.pagination.total_pages);
        resolve(res.data.posts_and_users);
      });
    });

    if (loggedIn) {
      const newLikeFlags = await Promise.all(
        posts_and_users.map((post_and_user) => {
          return new Promise((resolve) => {
            axiosAuthClient
              .get(`/posts/${post_and_user.post.id}/is_liked`)
              .then((res) => {
                resolve(res.data.flag);
              });
          });
        })
      );
      setLikeFlags(newLikeFlags);
    } else {
      const newLikeFlags = Array(posts_and_users.length).fill(false);
      setLikeFlags(newLikeFlags);
    }
  }, [page]);

  const isLoading =
    postAndUsers === null || totalPages === null || likeFlags === null;

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
      <Pagination
        totalPages={totalPages}
        page={page}
        setPostAndUsers={setPostAndUsers}
        setLikeFlags={setLikeFlags}
      />
      <Grid container>
        {postAndUsers.map((postAndUser, i) => (
          <Grid item xs={12} sm={12} md={6} key={postAndUser.post.id}>
            <Grid container key={postAndUser.post.id}>
              <Grid item xs={1} />
              <Grid item xs={10} style={{ marginBottom: 20 }}>
                <Post postAndUser={postAndUser} likeFlag={likeFlags[i]} />
              </Grid>
              <Grid item xs={1} />
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Pagination
        totalPages={totalPages}
        page={page}
        setPostAndUsers={setPostAndUsers}
        setLikeFlags={setLikeFlags}
      />
    </div>
  );
};

const Pagination = (props) => {
  const history = useHistory();

  const MuiPagination_ = withStyles({
    root: {
      display: 'inline-block',
    },
  })(MuiPagination);

  return (
    <div style={{ textAlign: 'center' }}>
      <MuiPagination_
        count={props.totalPages}
        color='primary'
        onChange={(_, page) => {
          history.push(`/posts?page=${page}`);
        }}
        page={props.page}
        style={{ marginBottom: 30 }}
      />
    </div>
  );
};

export default App;
