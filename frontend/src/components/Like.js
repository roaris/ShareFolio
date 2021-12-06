import FavoriteIcon from '@mui/icons-material/Favorite';

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
          <FavoriteIcon style={{ fontSize: 30, verticalAlign: 'middle' }} />
          <span style={{ fontSize: 25, verticalAlign: 'middle' }}>
            {props.likeNum}
          </span>
        </div>
      )}
    </>
  );
};

export default Like;
