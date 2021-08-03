// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import * as Yup from 'yup';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import closeFill from '@iconify/icons-eva/close-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
// material
import {
  Box,
  Container,
  Stack,
  StackProps,
  Button,
  ButtonProps,
  Typography,
  Grid,
  Card,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  IconButton
} from '@material-ui/core';

// components
import Page from '../components/Page';
import { LandingPaymentForm, LandingPaymentShare } from '../components/_external-pages/landing';
import {
  varFadeIn,
  varFadeInUp,
  varWrapEnter,
  varFadeInRight,
  DialogAnimate
} from '../components/animate';
import NftCard from '../components/NftCard';
import NftSwitches from '../components/NftSwitches';
import ConfigOff from '../components/ConfigOff';

import useAuth from '../hooks/useAuth';
import useIsMountedRef from '../hooks/useIsMountedRef';
import { MIconButton } from '../components/@material-extend';
import Who from './Who';

// ----------------------------------------------------------------------

const DivStyle = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  minHeight: '100vh',
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    position: 'fixed',
    alignItems: 'center'
  }
}));

const RootStyle = styled(Page)(({ theme }) => ({
  height: '100%'
}));

const ContentStyle = styled((props: StackProps) => <Stack spacing={5} {...props} />)(
  ({ theme }) => ({
    zIndex: 10,
    maxWidth: 800,
    margin: 'auto',
    textAlign: 'center',
    position: 'relative',
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(8)
  })
);
const ButtonStyle = styled((props: ButtonProps) => <Button {...props} />)(({ theme }) => ({
  // backgroundColor: 'white',
  // color: 'black',
  position: 'absolute',
  top: 25,
  right: 30,
  // zIndex: 1000,
  [theme.breakpoints.down('md')]: {
    top: 18,
    right: 25
  }
}));

// ----------------------------------------------------------------------

type InitialValues = {
  requesterAddress: string;
  afterSubmit?: string;
};

export default function Config() {
  const { user } = useAuth();
  console.log('USER', user);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  if (!user || !user.nftList) navigate('/');

  return (
    <RootStyle title="Show My NFTs" id="move_top">
      <Who />
      <DivStyle initial="initial" animate="animate" variants={varWrapEnter}>
        <Container maxWidth="sm">
          <ContentStyle>
            <Card
              sx={{
                padding: 2,
                height: 250
              }}
            >
              <Box padding={2}>
                <Typography variant="h4" color="inherit">
                  Configuration panel
                </Typography>
                <ConfigOff />
              </Box>
            </Card>
          </ContentStyle>
        </Container>
      </DivStyle>
    </RootStyle>
  );
}
