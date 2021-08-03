import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
//
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
// import ImageInfo from './ImageInfo';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  width: '100%',
  overflow: 'hidden',
  backgroundColor: 'black'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

const bgImages = [
  { href: 'btcangel.jpeg', name: 'BitCoin Angel', artist: 'Bepple', src: '#' },
  { href: 'micky.jpeg', name: '', artist: '', src: '' },
  { href: 'collage.jpeg', name: '', artist: '', src: '' }
];

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [indexBg] = useState(Math.floor(Math.random() * 3));
  const [open, setOpen] = useState(false);

  return (
    <RootStyle
      sx={{
        background: `#000000 url('/static/mock-images/${bgImages[indexBg].href}') no-repeat`,
        backgroundSize: 'cover'
      }}
    >
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle>
        <Outlet />
      </MainStyle>
      {/* <ImageInfo data={bgImages[indexBg]} /> */}
    </RootStyle>
  );
}
