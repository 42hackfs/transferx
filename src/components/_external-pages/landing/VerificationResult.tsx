import { Typography, Button, Stack } from '@material-ui/core';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-circle-fill';
import checkmarkFill from '@iconify/icons-eva/checkmark-circle-2-fill';

import { Verification } from '../../../pages/LandingPageSend';

interface VerificationResultProps {
  verification: Verification;
  setVerification: (arg?: Verification) => void;
}
function VerificationResult({ verification, setVerification }: VerificationResultProps) {
  const { verified, message, detail } = verification;
  return (
    <Stack sx={{ padding: 4 }} spacing={3} alignItems="center" textAlign="center">
      <Icon width={60} icon={verified ? checkmarkFill : closeFill} />
      <Typography sx={{ fontFamily: 'Roobert' }} variant="h4" color="initial">
        {message}
      </Typography>
      <Typography variant="caption">{detail}</Typography>
      <Button
        onClick={() => setVerification(undefined)}
        fullWidth
        variant="contained"
        color="primary"
      >
        {verified ? 'Create a payment link' : 'Go back to payment page'}
      </Button>
    </Stack>
  );
}

export default VerificationResult;
