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
  const tagId = query.get('tag_id');
  const loggedIn = useContext(AuthContext).loggedIn;
  const [postAndUsers, setPostAndUsers] = useState(null);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    setPostAndUsers(null);

    const callback = (res) => {
      setPostAndUsers(res.data.posts_and_users);
      setTotalPages(res.data.pagination.total_pages);
    };

    const requestUrl = tagId
      ? `/posts?page=${page}&per=10&tag_id=${tagId}`
      : `/posts?page=${page}&per=10`;
    if (loggedIn) {
      axiosAuthClient.get(requestUrl).then(callback);
    } else {
      axiosClient.get(requestUrl).then(callback);
    }
  }, [page]);

  const isLoading = postAndUsers === null || totalPages === null;

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
        <h1>{tagId ? `${tagId}の投稿一覧` : '投稿一覧'}</h1>
      </div>
      <Pagination totalPages={totalPages} page={page} tagId={tagId} />
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
      <Pagination totalPages={totalPages} page={page} tagId={tagId} />
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
          const url = props.tagId
            ? `/posts?tag_id=${props.tagId}&page=${page}`
            : `/posts?page=${page}`;
          history.push(url);
        }}
        page={props.page}
        style={{ marginBottom: 30 }}
      />
    </div>
  );
};

export default App;
