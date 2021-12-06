import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Like = (props) => {
  return (
    <>
      {props.likeFlag ? (
        <div onClick={props.destroyLike}>
          <FavoriteIcon
            style={{ color: 'red', fontSize: 30, verticalAlign: 'middle' }}
          />
          <span style={{ fontSize: 25, verticalAlign: 'middle' }}>
            {props.likeNum}
          </span>
        </div>
      ) : (
        <div onClick={props.createLike}>
          <FavoriteBorderIcon style={{ fontSize: 30, verticalAlign: 'middle' }} />
          <span style={{ fontSize: 25, verticalAlign: 'middle' }}>
            {props.likeNum}
          </span>
        </div>
      )}
    </>
  );
};

export default Like;
