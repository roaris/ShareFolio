import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { axiosClient } from '../api/axiosClient';
import Grid from '@material-ui/core/Grid';
import Post from '../components/Post';
import MDSpinner from 'react-md-spinner';
import MuiPagination from '@material-ui/lab/Pagination';
import { withStyles } from '@material-ui/core/styles';

const App = () => {
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const page = query.get('page') ? parseInt(query.get('page'), 10) : 1;
  const [postAndUsers, setPostAndUsers] = useState(null);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    axiosClient.get(`/posts?page=${page}&per=10`).then((res) => {
      setPostAndUsers(res.data.posts_and_users);
      setTotalPages(res.data.pagination.total_pages);
    });
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
        <h1>投稿一覧</h1>
      </div>
      <Pagination totalPages={totalPages} page={page} />
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
      <Pagination totalPages={totalPages} page={page} />
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
