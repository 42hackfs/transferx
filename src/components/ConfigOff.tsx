import { Box, Button, FormControlLabel, Switch } from '@material-ui/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH_PAGE } from '../routes/paths';
import useAuth from '../hooks/useAuth';

function ConfigOff() {
  const [state, setState] = useState(true);
  const { updateProfile } = useAuth();
  // const { reset }
  const navigate = useNavigate();

  const handleChange = (setState: any, state: any) => {
    if (!state) {
      setState(true);
      updateProfile?.({ activated: true });
    } else {
      setState(false);
      updateProfile?.({ activated: false });
    }
  };

  const reconfigureNFTs = () => {
    console.log('i want to reconfigure my Nfts');

    navigate(PATH_PAGE.nfts);
  };
  return (
    <Box>
      <Box padding={2} display="flex" justifyContent="center">
        <FormControlLabel
          control={
            <Switch
              checked={state}
              onChange={() => handleChange(setState, state)}
              color="primary"
              name="checkedB"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          }
          label="Auto-update of profile picture & banner"
        />
      </Box>
      <Box padding={4} display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="inherit"
          // sx={{ position: 'relative', bottom: 20, left: 50 }}
          onClick={reconfigureNFTs}
        >
          Reconfigure my NFTs
        </Button>
      </Box>
    </Box>
  );
}

export default ConfigOff;
