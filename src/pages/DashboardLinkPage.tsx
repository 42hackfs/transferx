// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { useParams, useLocation, Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Grid, Container } from '@material-ui/core';
// components
import Page from '../components/Page';
import {
  DashboardLink,
  ReceiverCard,
  LandingPaymentLinkInfoDashboard,
  Modal
} from '../components/_external-pages/landing';
import { varWrapEnter } from '../components/animate';
import { usePayment } from '../hooks/usePayment';

// ----------------------------------------------------------------------

const DivStyle = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  minHeight: '100vh',
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
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

// ----------------------------------------------------------------------

export default function LandingPageSend() {
  const { paymentId = '' } = useParams();
  const { error, loading, payment } = usePayment(paymentId);

  const [checkPw, setCheckPw] = useState();

  return (
    <RootStyle title="Show My NFTs | Dashboard" id="move_top">
      {checkPw ? (
        <DivStyle initial="initial" animate="animate" variants={varWrapEnter}>
          <Container maxWidth="lg">
            <Grid container direction="row" alignItems="flex-start" spacing={2}>
              <Grid item xs={12} sm={6}>
                <ReceiverCard payment={payment} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LandingPaymentLinkInfoDashboard id={paymentId} />
              </Grid>
              <Grid item xs={12}>
                <DashboardLink paymentId={paymentId} />
              </Grid>
            </Grid>
          </Container>
        </DivStyle>
      ) : (
        <Modal checkPw={checkPw} setCheckPw={setCheckPw} />
      )}
    </RootStyle>
  );
}
