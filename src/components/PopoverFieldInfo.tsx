import { useState } from 'react';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import Popper, { PopperPlacementType } from '@material-ui/core/Popper';
import { Fade, Typography, Paper } from '@material-ui/core';

// ----------------------------------------------------------------------

const ArrowStyle = styled('span')(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    top: '50%',
    zIndex: 1,
    width: 12,
    left: 0,
    height: 12,
    content: "''",
    position: 'absolute',
    borderRadius: '0 0 4px 0',
    transform: 'rotate(135deg)',
    background: '#424242',
    // background: theme.palette.background.paper,
    borderRight: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
    borderBottom: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`
  }
}));

// ----------------------------------------------------------------------

export default function MenuPopper({ children, anchorEl, ...other }: any) {
  const [open, setOpen] = useState(true);
  const [placement, setPlacement] = useState<PopperPlacementType>('right');
  return (
    <Popper open={true} anchorEl={anchorEl} placement={placement} transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper
            sx={{
              mt: 1.5,
              ml: 0.5,
              overflow: 'inherit',
              background: '#424242',
              color: 'white',
              width: 250
            }}
          >
            <ArrowStyle />
            {children}
          </Paper>
        </Fade>
      )}
    </Popper>
  );
}
