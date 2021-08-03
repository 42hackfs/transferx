import {
  Typography,
  Button,
  Stack,
  Card,
  CardContent,
  CardProps,
  Box,
  Link
} from '@material-ui/core';
import { Icon } from '@iconify/react';
import checkmarkFill from '@iconify/icons-eva/checkmark-circle-2-fill';
import { experimentalStyled as styled } from '@material-ui/core/styles';

import copyFill from '@iconify/icons-eva/copy-fill';

import { useSnackbar } from 'notistack';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CopyClipboard from '../../CopyClipboard';

const CardStyle = styled((props: CardProps) => <Card {...props} />)(({ theme }) => ({
  width: '100%',
  boxShadow: 'none',
  cursor: 'pointer'
}));

function LandingPaymentLinkInfoDashboard({ id }: { id: string }) {
  const { enqueueSnackbar } = useSnackbar();
  const onCopy = () => {
    enqueueSnackbar('Copied', { variant: 'success' });
  };

  return (
    // <Stack sx={{ padding: 4 }} alignItems="center" textAlign="center">
    <Stack alignItems="center" textAlign="center">
      <CardStyle variant="outlined">
        <CardContent sx={{ textAlign: 'center' }}>
          {/* <Icon width={60} icon={checkmarkFill} /> */}
          {/* <Typography variant="h4" color="initial">
        Your payment link has been created!
      </Typography> */}
          <CopyToClipboard text={`https://fundx-d86bf.web.app/link/${id}`} onCopy={onCopy}>
            <CardStyle variant="outlined">
              <CardContent sx={{ textAlign: 'left' }}>
                <Typography sx={{ fontSize: 12 }} color="textSecondary" gutterBottom>
                  Payment Link
                </Typography>
                <Typography variant="subtitle1" component="h2" gutterBottom>
                  https://fundx-d86bf.web.app/link/{id}
                </Typography>

                <Typography sx={{ fontSize: 12 }} color="textSecondary">
                  <Icon icon={copyFill} width={12} height={12} /> Copy Link
                </Typography>
              </CardContent>
            </CardStyle>
          </CopyToClipboard>
          <Box pt={16}>
            <Button fullWidth variant="contained" color="primary">
              Create New Payment Link
            </Button>
          </Box>
          {/* <CopyClipboard value={`https://pay.fundx.com/${id}`} readOnly label="Payment Link" /> */}
        </CardContent>
      </CardStyle>
    </Stack>
  );
}

export default LandingPaymentLinkInfoDashboard;
