import React, { useState, useEffect } from 'react';
import { axiosClient } from '../api/axiosClient';
import CreatedAt from '../components/CreatedAt';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MDSpinner from 'react-md-spinner';

const UserDetail = (props) => {
  const { params } = props.match;
  const id = parseInt(params.id, 10);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    axiosClient.get(`/users/${id}`).then((res) => {
      setUser(res.data);
    });
    axiosClient.get(`/users/${id}/posts`).then((res) => {
      setPosts(res.data);
    });
  }, []);

  const previewDescription = (description) => {
    let result = '';
    for (let i = 0; i < description.length; i++) {
      const c = description[i];
      if (c == ' ' || c == '#') continue;
      result += c;
      if (result.length > 150) {
        result += '...';
        break;
      }
    }
    return result;
  };

  const styles = makeStyles({
    user: {
      paddingTop: 100,
    },
    icon: {
      border: 'solid 1px #bbb',
      borderRadius: '50%',
      height: 300,
      width: 300,
    },
    userName: {
      fontSize: 30,
    },
    userItem: {
      fontSize: 20,
    },
    post: {
      border: 'solid 1px #bbb',
      borderRadius: '10px',
      marginBottom: 20,
      padding: 10,
    },
    appName: {
      fontSize: 30,
      textDecoration: 'none',
    },
    description: {
      fontSize: 15,
      overflowWrap: 'break-word',
      borderBottom: '1px solid #bbb',
    },
    postFooter: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: 5,
    },
  });

  const classes = styles();
  const isLoading = user === null || posts === null;

  return isLoading ? (
    <div style={{ marginTop: 100, textAlign: 'center' }}>
      <MDSpinner size={70} />
    </div>
  ) : (
    <div>
      <Grid
        container
        alignItems='center'
        justifyContent='center'
        className={classes.user}
      >
        <Grid item xs={0} md={2} />
        <Grid item xs={12} md={4}>
          <Grid container alignItems='center' justifyContent='center'>
            <img
              src={
                user.upload_icon.url
                  ? user.upload_icon.url
                  : user.default_icon_url
              }
              className={classes.icon}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container alignItems='center' justifyContent='center'>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className={classes.userName}>{user.name}</span>
              <span className={classes.userItem}>
                {user.created_at.split('T')[0].substr(0, 10)}に登録
              </span>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={0} md={2} />
      </Grid>
      <Grid container style={{ marginTop: 30 }}>
        <Grid item xs={0} md={2} />
        <Grid item xs={12} md={8}>
          <Grid container direction='column'>
            <span style={{ fontSize: 25, marginLeft: 20, marginBottom: 20 }}>
              作成したアプリ一覧
            </span>
            <Grid container>
              {posts.map((post) => (
                <Grid item xs={12} sm={12} md={6} key={post.id}>
                  <Grid container>
                    <Grid item xs={1} />
                    <Grid item xs={10} className={classes.post}>
                      <Link
                        className={classes.appName}
                        href={`/posts/${post.id}`}
                      >
                        {post.app_name}
                      </Link>
                      <Typography className={classes.description}>
                        {previewDescription(post.description)}
                      </Typography>
                      <div className={classes.postFooter}>
                        <CreatedAt createdAt={post.created_at} />
                      </div>
                    </Grid>
                    <Grid item xs={1} />
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={0} md={2} />
      </Grid>
    </div>
  );
};

export default UserDetail;
