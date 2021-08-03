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
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  })
);
const ButtonStyle = styled((props: ButtonProps) => <Button {...props} />)(({ theme }) => ({
  // backgroundColor: 'white',
  // color: 'black',
  position: 'absolute',
  top: 25,
  right: 30,
  zIndex: 1000,
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

export default function Who() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DialogAnimate open={open}>
        <DialogTitle id="alert-dialog-title">You are too curious, bro. </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box>
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  window.open('https://twitter.com/fredrikalindh');
                }}
              >
                <Icon icon={twitterFill} height={24} />
              </IconButton>
              Fredrika Lindh (AKA the genius)
            </Box>
            <Box>
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  window.open('https://twitter.com/AurlienWery3');
                }}
              >
                <Icon icon={twitterFill} height={24} />
              </IconButton>
              Aurélien Wery (he did one function lol)
            </Box>
            <Box>
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  window.open('https://twitter.com/antinertia');
                }}
              >
                <Icon icon={twitterFill} height={24} />
              </IconButton>
              Jeddi (he asked for this tool on Twitter)
            </Box>
            <Box>
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  window.open('https://twitter.com/mathisgrosjean');
                }}
              >
                <Icon icon={twitterFill} height={24} />
              </IconButton>
              Mathis Grosjean (what is he doing here?)
            </Box>
            <Box pt={3}>Join us if you want to build cool crypto products!</Box>
            <Box pt={2}>
              We are ambitious developers eager to build new projects until we find the next (very)
              big thing. Our goal is to form a talented team with gender parity. For now, we have
              coders from top-world universities, self-taught geniuses, and... you?
            </Box>
            <Box pt={2}>DM @mathisgrosjean to join the fun.</Box>
            <Box pt={2}>
              ⚠️ Disclaimer: technical HARD WORKERS only! Non-technical exception for the visionary
              profile... if you feel like the Steve Jobs of crypto, reach out 🙂
            </Box>
            <Box pt={2}>
              You can also share your ideas with us, like Jeddi did. We will ship them fast. We
              don't fear technical challenge, so feel free to share your craziest ideas with us. It
              can be quick tools like this or bigger dApps with a HUGE growth potential.
            </Box>
            <Box pt={2}>
              We care about your data privacy. Contact mathis.grosjean.42@gmail.com if you want to
              delete your account.
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Back</Button>
        </DialogActions>
      </DialogAnimate>
      <ButtonStyle
        onClick={() => {
          setOpen(true);
        }}
        size="small"
        variant="contained"
      >
        Who built this shit?
      </ButtonStyle>
    </>
  );
}
