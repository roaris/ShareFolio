import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const Post = (props) => {
  return (
    <div>
      <Card>
        <CardContent>
          <Typography style={{ fontSize: '25px' }}>{props.post.title}</Typography>
          <Typography style={{ wordWrap: "break-word" }}>{props.post.content}</Typography>
        </CardContent>
        <CardActions>
          <Button
            variant='contained'>
            Detail
          </Button>
          <Button
            variant='contained'
            color='primary'>
            Edit
          </Button>
          <Button
            variant='contained'
            color='secondary'>
            Delete
          </Button>
        </CardActions>
      </Card>
    </div>
  )
};

export default Post;
