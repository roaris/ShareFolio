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
          <Comment
            commentAndUser={commentAndUser}
            editComment={(markdown) =>
              props.editComment(commentAndUser.comment.id, i, markdown)
            }
            deleteComment={() =>
              props.deleteComment(commentAndUser.comment.id, i)
            }
          />
        </div>
      ))}
    </div>
  );
};

export default CommentList;
