const Tag = (props) => {
  return (
    <span
      style={{
        backgroundColor: 'hsl(0, 0%, 90%)',
        borderRadius: 5,
        marginRight: 5,
        padding: 3,
        fontSize: 12,
      }}
    >
      {props.name}
    </span>
  );
};

export default Tag;
