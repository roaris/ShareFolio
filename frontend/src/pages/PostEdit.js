import React, { useEffect, useState, useMemo, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { FlashMessageContext } from '../contexts/FlashMessageContext';
import { useHistory } from 'react-router-dom';
import { axiosAuthClient, axiosClient } from '../api/axiosClient';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import Select from 'react-select';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MDSpinner from 'react-md-spinner';

const PostEdit = (props) => {
  const style = {
    display: 'flex',
    flexDirection: 'column',
  };

  const { params } = props.match;
  const id = parseInt(params.id, 10);
  const [inputValue, setInputValue] = useState(null);
  const [validationMessage, setValidationMessage] = useState({
    app_name: '',
    app_url: '',
    repo_url: '',
    description: '',
  });
  const [markdown, setMarkdown] = useState();
  const markdownOption = useMemo(() => {
    return {
      toolbar: ['preview'],
      spellChecker: false,
    };
  }, []);
  const history = useHistory();
  const loginUser = useContext(AuthContext).user;
  const updateFlashMessage = useContext(FlashMessageContext).updateFlashMessage;
  const [tags, setTags] = useState(null);
  const [tagIds, setTagIds] = useState([]);

  useEffect(async () => {
    await axiosClient.get(`/posts/${id}`).then((res) => {
      const ownerId = res.data.user.id;
      if (ownerId !== loginUser.id) {
        history.push('/posts');
        updateFlashMessage({ errorMessage: '権限がありません' });
      }

      const post = res.data.post;
      setInputValue({
        app_name: post.app_name,
        app_url: post.app_url,
        repo_url: post.repo_url,
      });
      setTagIds(post.tags.map((tag) => tag.id));
      setMarkdown(post.description);
    });

    axiosAuthClient.get('/tags').then((res) => {
      setTags(
        res.data.map((tag) => {
          return { label: tag.name, value: tag.id };
        })
      );
    });
  }, []);

  const changeInputValue = (itemName, e) => {
    const newInputValue = Object.assign({}, inputValue);
    newInputValue[itemName] = e.target.value;
    setInputValue(newInputValue);
  };

  const updatePost = async () => {
    const postId = await axiosAuthClient
      .patch(`/posts/${id}`, {
        post: Object.assign({}, inputValue, { description: markdown }),
      })
      .then((res) => {
        return res.data.id;
      })
      .catch((err) => {
        if (err.response.status === 400) {
          const newValidationMessage = {
            app_name: '',
            app_url: '',
            repo_url: '',
            description: '',
          };
          for (const property in err.response.data) {
            newValidationMessage[property] = err.response.data[property][0];
          }
          setValidationMessage(newValidationMessage);
        }
      });

    if (!postId) return;

    axiosAuthClient
      .patch(`/posts/${postId}/taggings`, {
        tag_ids: tagIds,
      })
      .then(() => {
        history.push(`/posts/${postId}`);
        updateFlashMessage({ successMessage: '更新しました' });
      });
  };

  const isLoading = tags === null;

  return isLoading ? (
    <div style={{ marginTop: 100, textAlign: 'center' }}>
      <MDSpinner size={70} />
    </div>
  ) : (
    <Grid container style={{ paddingTop: 100 }}>
      <Grid item xs={1} lg={3} />
      <Grid item xs={10} lg={6} style={style}>
        <p style={{ fontSize: 18, margin: 0 }}>
          1. アプリ名を入力してください。
        </p>
        <TextField
          variant='outlined'
          style={{ marginBottom: 30 }}
          value={inputValue.app_name}
          onChange={(e) => changeInputValue('app_name', e)}
          error={validationMessage.app_name !== ''}
          helperText={validationMessage.app_name}
        />
        <p style={{ fontSize: 18, margin: 0 }}>
          2. デプロイ先のURLを入力してください。
        </p>
        <TextField
          variant='outlined'
          style={{ marginBottom: 30 }}
          value={inputValue.app_url}
          onChange={(e) => changeInputValue('app_url', e)}
          error={validationMessage.app_url !== ''}
          helperText={validationMessage.app_url}
        />
        <p style={{ fontSize: 18, margin: 0 }}>
          3. レポジトリのURLを入力してください。
        </p>
        <TextField
          variant='outlined'
          style={{ marginBottom: 30 }}
          value={inputValue.repo_url}
          onChange={(e) => changeInputValue('repo_url', e)}
          error={validationMessage.repo_url !== ''}
          helperText={validationMessage.repo_url}
        />
        <p style={{ fontSize: 18, margin: 0 }}>
          4. 使用した技術を選択してください。(複数選択可)
        </p>
        <div style={{ marginBottom: 30 }}>
          <Select
            defaultValue={tagIds.map((tagId) =>
              tags.find((tag) => tag.value === tagId)
            )}
            isMulti
            options={tags}
            onChange={(arr) => setTagIds(arr.map((e) => e.value))}
            placeholder='使用技術'
          />
        </div>
        <p style={{ fontSize: 18, margin: 0 }}>
          5. アプリの概要や工夫点を入力してください。
        </p>
        <SimpleMDE
          value={markdown}
          onChange={(e) => setMarkdown(e)}
          style={{ width: '100%' }}
          options={markdownOption}
        />
        <p style={{ color: 'red', padding: 5 }}>
          {validationMessage.description}
        </p>
        <Grid container alignItems='center' justifyContent='center'>
          <Button
            variant='contained'
            color='primary'
            style={{ marginBottom: 30, width: 300 }}
            onClick={updatePost}
          >
            更新
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={1} lg={3} />
    </Grid>
  );
};

export default PostEdit;
