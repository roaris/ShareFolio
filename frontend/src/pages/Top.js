import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { axiosClient } from '../api/axiosClient';
import Post from '../components/Post';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import MDSpinner from 'react-md-spinner';

const Top = () => {
  const [postsAndUsers, setPostsAndUsers] = useState(null);

  useEffect(() => {
    axiosClient.get('/posts/recent?limit=4').then((res) => setPostsAndUsers(res.data));
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
    },
    appDescription: {
      fontSize: 'calc(1px + 2.5vmin)',
      marginLeft: 20,
    },
  });

  const classes = styles();

  return (
    <div className={classes.top}>
      <Grid container>
        <Grid item xs={12} className={classes.jumbotron}>
          <h1>ShareFolio</h1>
          <p>
            ShareFolioはWebエンジニアを目指す人のためのポートフォリオプラットフォームです。
          </p>
        </Grid>
      </Grid>
      <h2 style={{ marginLeft: 20 }}>このアプリについて</h2>
      <div className={classes.appDescription}>
        <div>
          <CheckIcon style={{ color: 'green', verticalAlign: 'middle' }} />
          <span style={{ verticalAlign: 'middle' }}>
            自分の作ったWebアプリを投稿することで、他の人からアドバイスをもらうことができます。
          </span>
        </div>
        <div>
          <CheckIcon style={{ color: 'green', verticalAlign: 'middle' }} />
          <span style={{ verticalAlign: 'middle' }}>
            他の人のWebアプリを参考にして、自分の開発に役立てることができます。
          </span>
        </div>
      </div>
      <h2 style={{ marginLeft: 20 }}>最近の投稿</h2>
      {postsAndUsers === null ? (
        <div style={{ marginTop: 20, textAlign: 'center' }}>
          <MDSpinner size={70} />
        </div>
      ) : (
        <>
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
          <Button
            to='/posts'
            component={Link}
            variant='contained'
            color='primary'
            style={{ margin: 'auto', marginTop: 20, marginBottom: 30 }}
          >
            <DoubleArrowIcon />
            全ての投稿を見る
          </Button>
        </>
      )}
    </div>
  );
};

export default Top;
