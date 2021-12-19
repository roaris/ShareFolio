import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { axiosClient, axiosAuthClient } from '../api/axiosClient';
import CreatedAt from '../components/CreatedAt';
import Like from '../components/Like';
import Tags from '../components/Tags';
import Grid from '@mui/material/Grid';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import MDSpinner from 'react-md-spinner';
import { TwitterIcon, TwitterShareButton } from 'react-share';
import MuiTwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import SettingsIcon from '@mui/icons-material/Settings';

const UserDetail = (props) => {
  const { params } = props.match;
  const id = parseInt(params.id, 10);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const loggedIn = useContext(AuthContext).loggedIn;
  const loginUser = useContext(AuthContext).user;

  useEffect(async () => {
    axiosClient.get(`/users/${id}`).then((res) => {
      setUser(res.data);
    });

    const callback = (res) => {
      setPosts(res.data);
    };

    if (loggedIn) {
      axiosAuthClient.get(`/users/${id}/posts`).then(callback);
    } else {
      axiosClient.get(`/users/${id}/posts`).then(callback);
    }
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
    appNameAndLike: {
      alignItems: 'center',
      display: 'flex',
    },
    appName: {
      fontSize: 30,
      textDecoration: 'none',
    },
    like: {
      marginLeft: 'auto',
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
              <div style={{ display: 'flex' }}>
                {user.twitter && (
                  <span style={{ marginRight: 10 }}>
                    <a
                      href={`https://twitter.com/${user.twitter}`}
                      style={{ color: 'inherit' }}
                    >
                      <MuiTwitterIcon
                        style={{ color: '#4099FF', height: 30, width: 30 }}
                      />
                    </a>
                  </span>
                )}
                {user.github && (
                  <span>
                    <a
                      href={`https://github.com/${user.github}`}
                      style={{ color: 'inherit' }}
                    >
                      <GitHubIcon style={{ height: 30, width: 30 }} />
                    </a>
                  </span>
                )}
              </div>
              {id === loginUser?.id && (
                <Button
                  to='/setting'
                  component={Link}
                  variant='contained'
                  color='primary'
                  style={{ marginTop: 20 }}
                >
                  <SettingsIcon />
                  設定画面へ
                </Button>
              )}
            </div>
          </Grid>
        </Grid>
        <Grid item xs={0} md={2} />
      </Grid>
      <Grid container style={{ marginTop: 30 }}>
        <Grid item xs={0} md={2} />
        <Grid item xs={12} md={8}>
          <Grid container direction='column'>
            {posts.length === 0 ? (
              <span style={{ fontSize: 25, textAlign: 'center' }}>
                作成したアプリはありません
              </span>
            ) : (
              <>
                <span
                  style={{ fontSize: 25, marginLeft: 20, marginBottom: 20 }}
                >
                  作成したアプリ一覧
                </span>
                <Grid container>
                  {posts.map((post) => (
                    <Grid item xs={12} sm={12} md={6} key={post.id}>
                      <Grid container>
                        <Grid item xs={1} />
                        <Grid item xs={10} className={classes.post}>
                          <div className={classes.appNameAndLike}>
                            <MuiLink
                              className={classes.appName}
                              href={`/posts/${post.id}`}
                            >
                              {post.app_name}
                            </MuiLink>
                            <div className={classes.like}>
                              <Like
                                likeNum={post.like_num}
                                numSize={20}
                                likeFlag={post.like_flag}
                                heartSize={25}
                                createLike={() => {}}
                                destroyLike={() => {}}
                              />
                            </div>
                          </div>
                          <div style={{ marginTop: 10, marginBottom: 10 }}>
                            <Tags tags={post.tags} />
                          </div>
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
              </>
            )}
          </Grid>
        </Grid>
        <Grid item xs={0} md={2} />
      </Grid>
      <Grid container>
        <Grid item xs={0} md={2} />
        <Grid item xs={12} md={8}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginRight: 20,
              marginBottom: 20,
            }}
          >
            <TwitterShareButton
              url={`${process.env.REACT_APP_HOST_URL}/users/${user.id}`}
              title={`[ShareFolio] ${user.name}が作ったアプリ一覧`}
            >
              <TwitterIcon size={50} round={true} />
            </TwitterShareButton>
          </div>
        </Grid>
        <Grid item xs={0} md={2} />
      </Grid>
    </div>
  );
};

export default UserDetail;
