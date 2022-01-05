import Comment from './Comment';

const CommentList = (props) => {
  return (
    <div>
      {props.commentsAndUsers.length ? (
        <h2>コメント一覧({props.commentsAndUsers.length}件)</h2>
      ) : (
        <h2>コメントはまだありません</h2>
      )}
      {props.commentsAndUsers.map((commentAndUser, i) => (
        <div key={i}>
          <Comment commentAndUser={commentAndUser} />
        </div>
      ))}
    </div>
  );
};

export default CommentList;
