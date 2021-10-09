import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const EditForm = (props) => {
  return (
    <Grid container alignItems='center' justifyContent='center'>
      <Grid item xs={3} />
      <Grid item xs={6}>
        <TextField
          label='title'
          fullWidth
          value={props.inputValue.title}
          onChange={e => props.changeInputValue('title', e)}
          error={props.validationMessage.title !== ''}
          helperText={props.validationMessage.title} />
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={2} />
      <Grid item xs={8}>
        <TextField
          label='content'
          multiline
          fullWidth
          value={props.inputValue.content}
          onChange={e => props.changeInputValue('content', e)}
          error={props.validationMessage.content !== ''}
          helperText={props.validationMessage.content} />
      </Grid>
      <Grid item xs={2} />
      <Box mt={3}>
        <Button
          variant='contained'
          color='primary'
          onClick={() => props.updatePost()}>
          Update
        </Button>
      </Box>
    </Grid>
  );
};

export default EditForm;
