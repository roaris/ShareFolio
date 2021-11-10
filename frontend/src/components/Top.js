import React, { useState, useEffect } from 'react';
import Post from './Post';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const Top = () => {
  const [postsAndUsers, setPostsAndUsers] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/posts/recent`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
      .then(res => res.json())
      .then(setPostsAndUsers)
  }, []);

  const styles = makeStyles({
    top: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingTop: 50,
    },
    jumbotron: {
      backgroundColor: 'lightgray',
      fontSize: 'calc(1px + 3vmin)',
      padding: 30,
    }
  });

  const classes = styles();

  return (
    <div className={classes.top}>
      <Grid container>
        <Grid item xs={12} className={classes.jumbotron}>
          <h1>ShareFolio</h1>
          <p>ShareFolioはWebエンジニアを目指す人のためのポートフォリオプラットフォームです。</p>
        </Grid>
      </Grid>
      <h1 style={{marginLeft: 20}}>最近の投稿</h1>
      <Grid container>
        {postsAndUsers.map((postAndUser) => (
          <Grid item xs={12} sm={12} md={6} key={postAndUser.post.id}>
            <Grid container>
              <Grid item xs={1} />
              <Grid item xs={10} style={{ marginBottom: 20 }}>
                <Post postAndUser={postAndUser} />
              </Grid>
              <Grid item xs={1} />
            </Grid>
          </Grid>
        ))}
      </Grid>
      <div style={{ display: 'flex' }}>
        <Button
          to='/signup'
          component={Link}
          variant='contained'
          color='primary'
          style={{ marginRight: 10 }}
        >
          新規登録
        </Button>
        <Button
          to='/login'
          component={Link}
          variant='contained'
          color='primary'
        >
          ログイン
        </Button>
      </div>
    </div>
  );
};

export default Top;
