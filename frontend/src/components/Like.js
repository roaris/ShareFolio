import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Like = (props) => {
  return (
    <>
      {props.likeFlag ? (
        <div onClick={props.destroyLike}>
          <FavoriteIcon
            style={{ color: 'red', fontSize: props.heartSize, verticalAlign: 'middle' }}
          />
          <span style={{ fontSize: props.numSize, verticalAlign: 'middle' }}>
            {props.likeNum}
          </span>
        </div>
      ) : (
        <div onClick={props.createLike}>
          <FavoriteBorderIcon style={{ fontSize: props.heartSize, verticalAlign: 'middle' }} />
          <span style={{ fontSize: props.numSize, verticalAlign: 'middle' }}>
            {props.likeNum}
          </span>
        </div>
      )}
    </>
  );
};

export default Like;
