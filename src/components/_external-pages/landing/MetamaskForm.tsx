import React, { useState } from 'react';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { NavLink as RouterLink, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-circle-fill';
import checkmarkFill from '@iconify/icons-eva/checkmark-circle-2-fill';

import { LoadingButton } from '@material-ui/lab';
import { Typography, Stack, Alert, TextField, Button, Box } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import { handleTransaction } from '../../../utils/connectHardWallet';
import { Payment } from '../../../hooks/usePayment';
import { savePayment } from '../../../contexts/FirebaseContext';

type InitialValues = {
  senderEmail: string;
  senderName: string;
};

const MetamaskSchema = Yup.object().shape({
  senderEmail: Yup.string()
    .email('Email must be a valid email address')
    .required('Email is required'),
  senderName: Yup.string().required('Name is required')
});

type View = 'metamask' | 'confirm' | 'pending' | 'confirmed' | 'error';
interface MetamaskFormProps {
  payment?: Payment;
  myWallet?: string;
}

export const MetamaskForm = ({ myWallet, payment }: MetamaskFormProps) => {
  const [view, setView] = useState<View>('metamask');
  const [open, setOpen] = useState(false);
  const { paymentId = '' } = useParams();

  const formik = useFormik<InitialValues>({
    initialValues: {
      senderEmail: '',
      senderName: ''
    },
    validationSchema: MetamaskSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        if (payment) {
          setView('confirm');
        }
      } catch (error) {
        console.error(error);
        resetForm();
      }
    }
  });

  if (!payment) return null;

  const startTransaction = async () => {
    setView('pending');
    const txn = await handleTransaction(payment);

    if (txn) {
      setView('confirmed');
      const senderInfo = {
        ...values,
        txnHash: txn.hash
      };
      await savePayment(paymentId, senderInfo);
    } else {
      setView('error');
    }
    return 0;
  };

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, isValid } = formik;

  if (view === 'metamask') {
    return (
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack sx={{ padding: 4 }} spacing={3}>
            <Typography sx={{ fontFamily: 'Roobert', fontSize: 32 }} variant="h4">
              This information will help the requester know it’s you
            </Typography>

            <TextField
              fullWidth
              variant="filled"
              InputProps={{ disableUnderline: true }}
              type="text"
              label="Sender's Email"
              {...getFieldProps('senderEmail')}
              error={Boolean(touched.senderEmail && errors.senderEmail)}
              helperText={touched.senderEmail && errors.senderEmail}
            />
            <TextField
              fullWidth
              variant="filled"
              InputProps={{ disableUnderline: true }}
              type="text"
              label="Sender's Name"
              autoComplete="name"
              {...getFieldProps('senderName')}
              error={Boolean(touched.senderName && errors.senderName)}
              helperText={touched.senderName && errors.senderName}
            />

            <LoadingButton
              sx={{ borderRadius: 2 }}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="inherit"
              disabled={!isValid || !values.senderEmail || !values.senderName}
              loading={isSubmitting}
            >
              Continue
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    );
  }
  if (view === 'confirm') {
    return (
      <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
        <Typography sx={{ fontFamily: 'Roobert' }} variant="h4">
          Confirm your transaction on MetaMask
        </Typography>
        <Typography
          sx={{ my: 3 }}
          variant="caption"
        >{`This transaction will send ${payment?.amount} ${payment?.token} from your wallet ${myWallet} to ${payment?.requesterName}, ${payment?.requesterAddress}.`}</Typography>
        <LoadingButton
          sx={{ borderRadius: 2 }}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          onClick={() => startTransaction()}
        >
          Continue
        </LoadingButton>
      </Box>
    );
  }
  if (view === 'pending') {
    return (
      <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ fontFamily: 'Roobert' }} variant="h4">
          Waiting for confirmation
        </Typography>
        <CircularProgress sx={{ my: 3, color: 'black' }} />
        <Typography
          sx={{ my: 3, textAlign: 'center' }}
          variant="caption"
        >{`This transaction will send ${payment?.amount} ${payment?.token} from your wallet ${myWallet} to ${payment?.requesterName}, ${payment?.requesterAddress}.`}</Typography>
        <LoadingButton
          sx={{ borderRadius: 2 }}
          disabled={true}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
        >
          Continue
        </LoadingButton>
      </Box>
    );
  }
  if (view === 'confirmed') {
    return (
      <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Icon width={60} icon={checkmarkFill} />
        <Typography
          sx={{ fontFamily: 'Roobert' }}
          variant="h4"
        >{`You’ve sent ${payment?.amount} ${payment?.token} to ${payment?.requesterName}`}</Typography>
        <Typography sx={{ my: 3, textAlign: 'center' }} variant="caption">
          Ethereum transfers may take a few minutes to confirm. We notified the requester about the
          transaction.
        </Typography>
        <LoadingButton
          sx={{ borderRadius: 2 }}
          to="/"
          component={RouterLink}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
        >
          Create a payment link
        </LoadingButton>
      </Box>
    );
  }
  return (
    <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Icon width={60} style={{ color: '#B72136' }} icon={closeFill} />
      <Typography sx={{ fontFamily: 'Roobert', color: '#B72136' }} variant="h4">
        We did not process the payment
      </Typography>
      <Typography sx={{ my: 3, textAlign: 'center' }} variant="caption">
        You can try again the process if you whant to.
      </Typography>
      <LoadingButton
        sx={{ borderRadius: 2 }}
        to="/"
        component={RouterLink}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
      >
        Retry the payment preocess
      </LoadingButton>
    </Box>
  );
};

export default MetamaskForm;
