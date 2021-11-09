const CreatedAt = (props) => {
  return (
    props.createdAt && <span>
      {props.createdAt.split('T')[0].substr(0, 10)}&nbsp;
      {props.createdAt.split('T')[1].substr(0, 5)}
    </span>
  );
};

export default CreatedAt;
