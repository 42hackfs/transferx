import { Typography, Link } from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';

const DivStyle = styled('div')(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, .10)',
  backdropFilter: 'blur(5px)',
  WebkitBackdropFilter: 'blur(10px)',
  padding: '8px 15px',
  borderRadius: 25,
  textAlign: 'center',
  position: 'absolute',
  bottom: 20,
  right: 20,
  zIndex: 1000,
  // [theme.breakpoints.up('md')]: {
  //   right: 20
  // },
  '& a': {
    color: 'white'
  }
}));

type Image = { href: string; artist: string; name: string; src: string };

function ImageInfo({ data }: { data: Image }) {
  return (
    <DivStyle>
      <Link href={data.src} color="inherit">
        <Typography variant="body2">
          {data.name} by {data.artist}
        </Typography>
      </Link>
    </DivStyle>
  );
}

export default ImageInfo;
