import useBackground from '../hooks/useBackground';
import ImageInfo from './ImageInfo';

const NftBackground = () => {
  const background = useBackground();
  return (
    <div
      style={{
        background: `#000000 url('${background.href}') no-repeat`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
        position: 'absolute',
        overflow: 'scroll'
      }}
    >
      <ImageInfo data={background} />
    </div>
  );
};

export default NftBackground;
