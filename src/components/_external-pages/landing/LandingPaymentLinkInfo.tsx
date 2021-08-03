import { Typography, Button, Stack, Card, CardContent, CardProps, Link } from '@material-ui/core';
import { Icon } from '@iconify/react';
import checkmarkFill from '@iconify/icons-eva/checkmark-circle-2-fill';
import { experimentalStyled as styled } from '@material-ui/core/styles';

import copyFill from '@iconify/icons-eva/copy-fill';

import { useSnackbar } from 'notistack';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const CardStyle = styled((props: CardProps) => <Card {...props} />)(({ theme }) => ({
  width: '100%',
  boxShadow: 'none',
  cursor: 'pointer'
}));

function LandingPaymentLinkInfo({ id, reset }: { id: string; reset: () => void }) {
  const { enqueueSnackbar } = useSnackbar();
  const onCopy = () => {
    enqueueSnackbar('Copied', { variant: 'success' });
  };

  return (
    <Stack sx={{ padding: '2rem 1rem' }} spacing={3} alignItems="center" textAlign="center">
      <Icon width={60} icon={checkmarkFill} />
      <Typography sx={{ fontFamily: 'Roobert' }} variant="h4">
        Your payment link has been created!
      </Typography>
      <CopyToClipboard text={`https://fundx-d86bf.web.app/link/${id}`} onCopy={onCopy}>
        <CardStyle variant="outlined">
          <CardContent sx={{ textAlign: 'left' }}>
            <Typography sx={{ fontSize: 12 }} color="textSecondary" gutterBottom>
              Payment Link
            </Typography>
            <Typography variant="subtitle2" component="h2" gutterBottom>
              https://fundx-d86bf.web.app/link/{id}
            </Typography>
            <Typography sx={{ fontSize: 12 }} color="textSecondary">
              <Icon icon={copyFill} width={12} height={12} /> Copy Link
            </Typography>
          </CardContent>
        </CardStyle>
      </CopyToClipboard>
      <Button sx={{ borderRadius: 2 }} fullWidth variant="contained" onClick={reset}>
        Create New Payment Link
      </Button>
    </Stack>
  );
}

export default LandingPaymentLinkInfo;
