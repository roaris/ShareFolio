import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import marked from 'marked';
import DOMPurify from 'dompurify';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Owner from '../components/Owner';
import CommentForm from '../components/CommentForm';
import CreatedAt from '../components/CreatedAt';
import CommentList from '../components/CommentList';
import MDSpinner from 'react-md-spinner';

const PostDetail = (props) => {
  const { params } = props.match;
  const id = parseInt(params.id, 10);
  const [post, setPost] = useState(null);
  const [ownerName, setOwnerName] = useState('');
  const [ownerIconUrl, setOwnerIconUrl] = useState('');
  const [commentsAndUsers, setCommentsAndUsers] = useState(null);
  const userName = useContext(AuthContext).userName;
  const userIconUrl = useContext(AuthContext).userIconUrl;

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/posts/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setPost(res.post);
        setOwnerName(res.user.name);
        setOwnerIconUrl(res.user.icon.url);
        setCommentsAndUsers(res.comments_and_users);
      });
  }, []);

  const submitComment = (markdown) => {
    fetch(`${process.env.REACT_APP_API_URL}/posts/${id}/comments`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({
        comment: { content: markdown },
      }),
    }).then((res) => {
      if (res.status === 201) {
        res.json().then((res) => {
          const newCommentsAndUsers = commentsAndUsers.slice();
          newCommentsAndUsers.push({
            comment: res,
            user_name: userName,
            user_icon_url: userIconUrl,
          });
          setCommentsAndUsers(newCommentsAndUsers);
        });
      }
    });
  };

  const styles = makeStyles({
    postDetail: {
      marginBottom: 20,
      marginTop: 100,
    },
    icon: {
      border: 'solid 1px #bbb',
      borderRadius: '50%',
      height: 50,
      margin: '0 auto',
      marginTop: 20,
      width: 50,
    },
    userName: {
      overflowWrap: 'break-word',
    },
    postDetailRight: {
      border: 'solid 1px #bbb',
      borderRadius: '10px',
      padding: 20,
    },
    postDetailRightHeader: {
      borderBottom: 'solid 1px #bbb',
    },
    appName: {
      display: 'inline-block',
      verticalAlign: 'middle',
    },
    link: {
      color: '#fff',
      display: 'inline-block',
      margin: 10,
      textDecoration: 'none',
      verticalAlign: 'middle',
    },
    markdown: {
      borderBottom: 'solid 1px #bbb',
      overflowWrap: 'break-word',
    },
    postDetailFooter: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: 10,
    },
  });

  const classes = styles();
  const isLoading =
    post === null ||
    ownerName === null ||
    ownerIconUrl === '' ||
    commentsAndUsers === null;

  return isLoading ? (
    <div style={{ marginTop: 100, textAlign: 'center' }}>
      <MDSpinner size={70} />
    </div>
  ) : (
    <Grid container className={classes.postDetail}>
      <Grid item xs={1} sm={1} md={3} lg={3} />
      <Grid item xs={10} sm={10} md={6} lg={6}>
        <Grid container>
          <Grid item xs={2} lg={1}>
            <div style={{ marginTop: 20 }}>
              <Owner userIconUrl={ownerIconUrl} userName={ownerName} />
            </div>
          </Grid>
          <Grid item xs={10} lg={11} className={classes.postDetailRight}>
            <div className={classes.postDetailRightHeader}>
              <h1 className={classes.appName}>{post.app_name}</h1>
              <a href={post.app_url} className={classes.link}>
                <Button variant='contained' color='primary'>
                  アプリ
                </Button>
              </a>
              {post.repo_url && (
                <a href={post.repo_url} className={classes.link}>
                  <Button variant='contained' color='secondary'>
                    レポジトリ
                  </Button>
                </a>
              )}
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(marked(post.description)),
              }}
              className={classes.markdown}
            ></div>
            <div className={classes.postDetailFooter}>
              <CreatedAt createdAt={post.created_at} />
            </div>
          </Grid>
        </Grid>
        <div style={{ marginTop: 50 }}>
          <CommentForm submitComment={submitComment} />
        </div>
        <div style={{ marginTop: 50 }}>
          <CommentList commentsAndUsers={commentsAndUsers} />
        </div>
      </Grid>
      <Grid item xs={1} sm={1} md={3} lg={3} />
    </Grid>
  );
};

export default PostDetail;
