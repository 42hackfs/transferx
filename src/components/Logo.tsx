// material
// import { useTheme } from '@material-ui/core/styles';
import { Box, BoxProps } from '@material-ui/core';

// ----------------------------------------------------------------------

export default function Logo({ sx }: BoxProps) {
  return (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <img src="/favicon/logo.svg" width="100%" height="100%" alt="logo" />
    </Box>
  );
}
