import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { FlashMessageContext } from '../contexts/FlashMessageContext';
import { axiosAuthClient, axiosClient } from '../api/axiosClient';
import marked from 'marked';
import DOMPurify from 'dompurify';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Owner from '../components/Owner';
import CommentForm from '../components/CommentForm';
import CreatedAt from '../components/CreatedAt';
import CommentList from '../components/CommentList';
import Like from '../components/Like';
import MDSpinner from 'react-md-spinner';

const PostDetail = (props) => {
  const { params } = props.match;
  const id = parseInt(params.id, 10);
  const [post, setPost] = useState(null);
  const [ownerId, setOwnerId] = useState(null);
  const [ownerName, setOwnerName] = useState('');
  const [ownerIconUrl, setOwnerIconUrl] = useState('');
  const [commentsAndUsers, setCommentsAndUsers] = useState(null);
  const userName = useContext(AuthContext).userName;
  const userIconUrl = useContext(AuthContext).userIconUrl;
  const updateFlashMessage = useContext(FlashMessageContext).updateFlashMessage;
  const [likeNum, setLikeNum] = useState(null);
  const [likeFlag, setLikeFlag] = useState(null);

  useEffect(() => {
    axiosClient.get(`/posts/${id}`).then((res) => {
      setPost(res.data.post);
      setOwnerId(res.data.user.id);
      setOwnerName(res.data.user.name);
      setOwnerIconUrl(
        res.data.user.upload_icon.url
          ? res.data.user.upload_icon.url
          : res.data.user.default_icon_url
      );
      setCommentsAndUsers(res.data.comments_and_users);
      setLikeNum(res.data.post.like_num);
    });

    axiosAuthClient.get(`/posts/${id}/is_liked`).then((res) => {
      setLikeFlag(res.data.flag);
    });
  }, []);

  const submitComment = async (markdown) => {
    axiosAuthClient
      .post(`/posts/${id}/comments`, { comment: { content: markdown } })
      .then((res) => {
        const newCommentsAndUsers = commentsAndUsers.slice();
        newCommentsAndUsers.push({
          comment: res.data,
          user_name: userName,
          user_icon_url: userIconUrl,
        });
        setCommentsAndUsers(newCommentsAndUsers);
        updateFlashMessage({ successMessage: 'コメントをつけました' });
      });
  };

  const createLike = () => {
    setLikeFlag(true);
    setLikeNum(likeNum + 1);
    axiosAuthClient.post(`/posts/${id}/likes`);
  };

  const destroyLike = () => {
    setLikeFlag(false);
    setLikeNum(likeNum - 1);
    axiosAuthClient.delete(`/posts/${id}/likes`);
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
      paddingBottom: 20,
      borderBottom: 'solid 1px #bbb',
    },
    appNameAndLike: {
      alignItems: 'center',
      display: 'flex',
    },
    like: {
      marginLeft: 'auto',
    },
    link: {
      overflowWrap: 'break-word',
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
    commentsAndUsers === null ||
    likeNum === null ||
    likeFlag === null;

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
              <Owner
                userId={ownerId}
                userIconUrl={ownerIconUrl}
                userName={ownerName}
              />
            </div>
          </Grid>
          <Grid item xs={10} lg={11} className={classes.postDetailRight}>
            <div className={classes.postDetailRightHeader}>
              <div className={classes.appNameAndLike}>
                <h1>{post.app_name}</h1>
                <div className={classes.like}>
                  <Like
                    likeNum={likeNum}
                    likeFlag={likeFlag}
                    createLike={createLike}
                    destroyLike={destroyLike}
                  />
                </div>
              </div>
              アプリ:{' '}
              <a href={post.app_url} className={classes.link}>
                {post.app_url}
              </a>{' '}
              <br />
              {post.repo_url && (
                <>
                  レポジトリ:{' '}
                  <a href={post.repo_url} className={classes.link}>
                    {post.repo_url}
                  </a>
                </>
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
