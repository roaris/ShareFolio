import Tag from './Tag';

const Tags = (props) => {
  return (
    <div style={{ overflowWrap: 'break-word' }}>
      {props.tags.map((tag) => (
        <span key={tag.id}>
          <Tag id={tag.id} name={tag.name} />
        </span>
      ))}
    </div>
  );
};

export default Tags;
