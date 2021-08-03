import { experimentalStyled as styled } from '@material-ui/core/styles';
import Card, { CardProps } from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import Loading from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import copyFill from '@iconify/icons-eva/copy-fill';
import externalLinkFill from '@iconify/icons-eva/external-link-fill';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Payment } from '../../../hooks/usePayment';
import { fCurrency } from '../../../utils/formatNumber';
import { tokens } from '../../../utils/supportedTokens';

import LoadingScreen from '../../LoadingScreen';

const CardStyle = styled((props: CardProps) => <Card {...props} />)(({ theme }) => ({
  width: '100%',
  boxShadow: 'none'
}));

const BottomDiv = styled((props) => <Box {...props} />)(({ theme }) => ({
  backgroundColor: '#EDEEF2',
  padding: theme.spacing(3)
}));

interface ReceiverCardProps {
  payment?: Payment;
}

export default function ReceiverCard({ payment }: ReceiverCardProps) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const onCopy = () => {
    enqueueSnackbar('Copied', { variant: 'success' });
  };
  if (!payment) return null;
  const currency = tokens.find((token) => token.label === payment.token);
  return (
    <Card sx={{ minHeight: 340 }}>
      <Box sx={{ px: 2, pb: 1 }}>
        <CardContent sx={{ textAlign: 'left' }}>
          <Typography sx={{ fontFamily: 'Roobert' }} variant="h4">
            {payment.requesterName}
          </Typography>
          <Typography variant="caption">{payment.requesterEmail}</Typography>
          <Box sx={{ display: 'flex', mt: 4 }}>
            <img style={{ width: 20, marginRight: 10 }} alt="" src={currency?.icon} />
            <Typography variant="caption">{currency?.label}</Typography>
          </Box>
          <Typography
            variant="h3"
            sx={{ fontFeatureSettings: "'ss06' on", letterSpacing: '-0.02em' }}
          >
            {fCurrency(payment?.amount || 0)}
          </Typography>
        </CardContent>

        <CardStyle variant="outlined">
          <CardContent sx={{ textAlign: 'left' }}>
            <Typography sx={{ fontSize: 12 }} color="textSecondary" gutterBottom>
              Requester’s Address
            </Typography>
            <CopyToClipboard text={payment.requesterAddress} onCopy={onCopy}>
              <Typography
                sx={{
                  cursor: 'pointer',
                  fontFeatureSettings: "'ss06' on",
                  letterSpacing: '-0.02em'
                }}
                variant="subtitle1"
                gutterBottom
              >
                {payment.requesterAddress}
              </Typography>
            </CopyToClipboard>
            <Box sx={{ display: 'flex' }}>
              <CopyToClipboard text={payment.requesterAddress} onCopy={onCopy}>
                <Typography
                  sx={{ fontSize: 12, marginRight: 1, cursor: 'pointer' }}
                  color="textSecondary"
                >
                  <Icon icon={copyFill} width={12} height={12} /> Copy address
                </Typography>
              </CopyToClipboard>
              <Link
                href={`https://etherscan.io/address/${payment.requesterAddress}`}
                target="_blank"
                rel="noreferrer"
                underline="none"
                color="textSecondary"
                sx={{ fontSize: 12 }}
              >
                <Icon icon={externalLinkFill} width={12} height={12} /> View on Explorer
              </Link>
            </Box>
          </CardContent>
        </CardStyle>
      </Box>
      {payment.memo && (
        <BottomDiv>
          <Typography variant="caption">{payment.memo}</Typography>
        </BottomDiv>
      )}
    </Card>
  );
}
