// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import closeFill from '@iconify/icons-eva/close-fill';
// material
import {
  Card,
  Container,
  Stack,
  StackProps,
  Button,
  ButtonProps,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Box,
  IconButton
} from '@material-ui/core';
// routes
import Who from './Who';
import { PATH_PAGE } from '../routes/paths';
// components
import Page from '../components/Page';
import {
  varFadeIn,
  varFadeInUp,
  varWrapEnter,
  varFadeInRight,
  DialogAnimate
} from '../components/animate';

import useIsMountedRef from '../hooks/useIsMountedRef';
import useAuth from '../hooks/useAuth';
import { MIconButton } from '../components/@material-extend';
import LandingPaymentForm from './LandingPaymentForm';
import LandingPaymentLinkInfo from './LandingPaymentLinkInfo';

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
    maxWidth: 520,
    margin: 'auto',
    textAlign: 'center',
    position: 'relative',
    paddingTop: theme.spacing(12),
    pingBottom: theme.spacing(8),
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(15),
      paddingBottom: theme.spacing(15),
      margin: 'unset',
      textAlign: 'left',
      marginLeft: 20
    }
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
  // requesterEmail: string;
  // requesterName: string;
  // requesterAddress: string;
  // token: string;
  // amount?: number;
  // title: string;
  memo?: string;
  due?: number | null;
  afterSubmit?: string;
};

export default function LandingPage() {
  const navigate = useNavigate();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { connectWallet, user } = useAuth();
  // const [open, setOpen] = useState(false);

  const [paymentLink, setPaymentLink] = useState<string | null>(null);

  const LoginSchema = Yup.object().shape({
    // title: Yup.string().required('File title is required')
    // requesterEmail: Yup.string()
    //   .email('Email must be a valid email address')
    //   .required('Email is required'),
    // requesterName: Yup.string().required('Name is required'),
    // requesterAddress: Yup.string()
    //   .test(
    //     'length',
    //     'Invalid address, please put a 42 characters hexadecimal address',
    //     (val) => val?.length === 42 && /0x[0-9a-zA-Z]{40}/.test(val)
    //   )
    //   .required('Address is required'),
    // token: Yup.string().required('Token is required'),
    // amount: Yup.number().required('Amount is required')
  });

  const formik = useFormik<InitialValues>({
    initialValues: {
      // title: ''
      // requesterEmail: '',
      // requesterName: '',
      // requesterAddress: '',
      // token: 'USDC'
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        console.log({
          ...values
          // due: values.due ? new Date(values.due).toISOString() : null
        });
        const id = Math.floor(Math.random() * 10);
        // ===========================================================
        // UPLOAD TO WEB3 STORAGE ===========================================================
        // ===========================================================
        setPaymentLink(id.toString());
        enqueueSnackbar('File successfully uploaded', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        console.error(error);
        resetForm();
        if (isMountedRef.current) {
          setSubmitting(false);
          setErrors({ afterSubmit: error.message });
        }
      }
    }
  });

  const reset = () => {
    formik.resetForm();
    setPaymentLink(null);
  };

  // set sharedTwitter from db with useEffect
  return (
    <RootStyle title="TransferX" id="move_top">
      <Who />
      <DivStyle initial="initial" animate="animate" variants={varWrapEnter}>
        <Container maxWidth="lg">
          <ContentStyle>
            <motion.div variants={varFadeInRight}>
              <Card>
                {/* {user && user?.sharedOnTwitter ? (
                  <LandingPaymentForm formik={formik} />
                ) : (
                  <LandingPaymentShare formik2={formik2} />
                )} */}
                {paymentLink ? (
                  <LandingPaymentLinkInfo id={paymentLink} reset={reset} />
                ) : (
                  <LandingPaymentForm formik={formik} />
                )}
              </Card>
            </motion.div>
          </ContentStyle>
        </Container>
      </DivStyle>
    </RootStyle>
  );
}
