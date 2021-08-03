// material
import { Button } from '@material-ui/core';
// hooks
import useAuth from '../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function AuthWithSocial() {
  const { connectWallet } = useAuth();

  const handleConnectWallet = async () => {
    try {
      await connectWallet?.();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      fullWidth
      size="large"
      color="inherit"
      variant="contained"
      onClick={handleConnectWallet}
    >
      Connect your wallet
    </Button>
  );
}
