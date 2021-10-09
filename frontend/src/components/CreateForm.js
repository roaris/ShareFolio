import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const CreateForm = (props) => {
  return (
    <Grid container alignItems='center' justifyContent='center'>
      <Grid item xs={4} />
      <Grid item xs={4}>
        <TextField
          label='title'
          fullWidth
          value={props.inputValue.title}
          error={props.validationMessage.title !== ''}
          helperText={props.validationMessage.title}
          onChange={e => props.changeInputValue('title', e)} />
      </Grid>
      <Grid item xs={4} />
      <Grid item xs={3} />
      <Grid item xs={6}>
        <TextField
          label='content'
          multiline
          fullWidth
          value={props.inputValue.content}
          error={props.validationMessage.content !== ''}
          helperText={props.validationMessage.content}
          onChange={e => props.changeInputValue('content', e)} />
      </Grid>
      <Grid item xs={3} />
      <Box mt={5}>
        <Button
          variant='contained'
          color='primary'
          onClick={props.submitPost}>
          Create
        </Button>
      </Box>
    </Grid>
  );
};

export default CreateForm;
