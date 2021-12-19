import Tag from './Tag';

const Tags = (props) => {
  return (
    <div style={{ overflowWrap: 'break-word' }}>
      {props.names.map((name, i) => (
        <span key={i}>
          <Tag key={i} name={name} />
        </span>
      ))}
    </div>
  );
};

export default Tags;
