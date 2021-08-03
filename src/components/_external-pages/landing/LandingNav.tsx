import { useState } from 'react';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Stack from '@material-ui/core/Stack';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import QRCode from 'qrcode.react';

import { Theme, useMediaQuery } from '@material-ui/core';
import { DialogAnimate } from '../../animate';
import Identicon from './identiconmeta';
// import Logo from '../components/Logo';
import MenuPopover from '../../../layouts/MorePopover';
import { Payment } from '../../../hooks/usePayment';
import { Connection } from '../../../pages/LandingPageSend';

interface LandingNavProps {
  payment?: Payment;
  handleConnection: () => void;
  connection?: Connection;
}

const LandingNav = ({ payment, handleConnection, connection }: LandingNavProps) => {
  const [open, setOpen] = useState(false);

  const smallDown = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'));
  return (
    <>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          position: 'absolute',
          top: smallDown ? 18 : 25,
          right: smallDown ? 25 : 30,
          zIndex: 1000
        }}
      >
        {connection?.address ? (
          <Box
            sx={{
              px: 1,
              backgroundColor: '#fff',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4
            }}
          >
            <Identicon address={connection?.address} diameter={20} />
            <Typography sx={{ ml: 1, fontFeatureSettings: "'ss06' on", letterSpacing: '-0.02em' }}>
              {connection?.shortAddress}
            </Typography>
          </Box>
        ) : (
          <Button size="small" color="secondary" variant="contained" onClick={handleConnection}>
            Connect to a wallet
          </Button>
        )}

        <MenuPopover qrDialogOpen={setOpen} />
      </Stack>
      <DialogAnimate open={open}>
        <DialogTitle id="alert-dialog-title">Receiver address</DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          {payment && <QRCode value={payment.requesterAddress} />}
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </DialogAnimate>
    </>
  );
};

export default LandingNav;
