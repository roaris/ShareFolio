import Link from '@mui/material/Link';

const Tag = (props) => {
  return (
    <Link
      href={`/posts?tag=${props.name}`}
      style={{
        backgroundColor: 'hsl(0, 0%, 90%)',
        borderRadius: 5,
        color: 'black',
        fontSize: 12,
        marginRight: 5,
        padding: 3,
        textDecoration: 'none',
      }}
    >
      {props.name}
    </Link>
  );
};

export default Tag;
