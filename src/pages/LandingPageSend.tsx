// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';

import { motion } from 'framer-motion';
import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik } from 'formik';

// material
import { Card, Container, Stack, StackProps } from '@material-ui/core';

// components
import Page from '../components/Page';
import {
  LandingPaymentSend,
  LandingNav,
  ReceiverCard,
  VerificationResult
} from '../components/_external-pages/landing';

import { varWrapEnter, varFadeInRight } from '../components/animate';
import { connectHardWallet } from '../utils/connectHardWallet';
import { usePayment } from '../hooks/usePayment';

// import { verifyTransaction } from '../contexts/FirebaseContext';

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
  // backgroundImage: "url('/static/mock-images/The-Bitcoin-Angel-trevorjonesart-main.jpeg')"
}));

const ContentStyle = styled((props: StackProps) => <Stack spacing={5} {...props} />)(
  ({ theme }) => ({
    zIndex: 10,
    maxWidth: 520,
    margin: 'auto',
    textAlign: 'center',
    position: 'relative',
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(15),
      paddingBottom: theme.spacing(15),
      margin: 'unset',
      textAlign: 'left'
    }
  })
);

// ----------------------------------------------------------------------

type InitialValues = {
  senderEmail: string;
  senderName: string;
  txnHash: string;
};

export interface Verification {
  verified: boolean;
  message: string;
  detail: string;
}

export interface Connection {
  address: string;
  shortAddress: string;
  networkId: number;
}

export default function LandingPageSend() {
  const { paymentId = '' } = useParams();
  const [connection, setConnection] = useState<Connection | undefined>();
  const { error, loading, payment } = usePayment(paymentId || '');

  const [verification, setVerification] = useState<Verification>();

  const handleConnection = async () => {
    const connectionResult = await connectHardWallet();
    // @ts-ignore
    setConnection(connectionResult);
  };

  const LoginSchema = Yup.object().shape({
    senderEmail: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    senderName: Yup.string().required('Name is required'),
    txnHash: Yup.string()
      // .test('hash', 'Invalid hash', (val) => /[0-9a-zA-Z]{20, }/.test(val || ''))
      .required('Transaction Hash is required')
  });

  const formik = useFormik<InitialValues>({
    initialValues: {
      senderEmail: '',
      senderName: '',
      txnHash: ''
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        // const response = await verifyTransaction({ data: { senderInfo: values, paymentId } });
        // @ts-ignore
        // setVerification(response.data);
        //  console.log(values);
      } catch (error) {
        console.error(error);
        resetForm();
      }
    }
  });

  return (
    <RootStyle title="Show My NFTs" id="move_top">
      <DivStyle initial="initial" animate="animate" variants={varWrapEnter}>
        <LandingNav payment={payment} handleConnection={handleConnection} connection={connection} />
        <Container maxWidth="lg">
          <ContentStyle>
            <motion.div variants={varFadeInRight}>
              <Stack spacing={2}>
                <ReceiverCard payment={payment} />
                <Card>
                  {!verification ? (
                    <LandingPaymentSend
                      formik={formik}
                      handleConnection={handleConnection}
                      connection={connection}
                      payment={payment}
                    />
                  ) : (
                    <VerificationResult
                      verification={verification}
                      setVerification={setVerification}
                    />
                  )}
                </Card>
              </Stack>
            </motion.div>
          </ContentStyle>
        </Container>
      </DivStyle>
    </RootStyle>
  );
}
