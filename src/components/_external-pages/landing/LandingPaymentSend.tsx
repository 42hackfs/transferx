import { useState } from 'react';

import { Form, FormikProvider } from 'formik';

// material
import { LoadingButton } from '@material-ui/lab';
import { Typography, Stack, Alert, TextField, Button, Box } from '@material-ui/core';

import { Connection } from '../../../pages/LandingPageSend';
import Identicon from './identiconmeta';
import { MetamaskForm } from './MetamaskForm';
import { Payment } from '../../../hooks/usePayment';

// ----------------------------------------------------------------------

interface LandingPaymentSendProps {
  formik: any;
  handleConnection: () => void;
  connection?: Connection;
  payment?: Payment;
}

// ----------------------------------------------------------------------

export default function LandingPaymentSend({
  formik,
  handleConnection,
  connection,
  payment
}: LandingPaymentSendProps) {
  const [metamaskTranscation, setMetamaskTransaction] = useState(false);

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, isValid } = formik;

  return !metamaskTranscation ? (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack sx={{ padding: 4 }} spacing={3}>
          {!connection?.address ? (
            <Button
              fullWidth
              sx={{ borderRadius: 2 }}
              color="primary"
              size="large"
              variant="contained"
              onClick={handleConnection}
            >
              Connect to a wallet
            </Button>
          ) : (
            <>
              <Box
                sx={{
                  px: 1,
                  backgroundColor: '#fff',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 4
                }}
              >
                <Identicon address={connection?.address} diameter={20} />
                <Typography
                  sx={{ ml: 1, fontFeatureSettings: "'ss06' on", letterSpacing: '-0.02em' }}
                >
                  {connection?.shortAddress}
                </Typography>
              </Box>

              <Button
                fullWidth
                sx={{ borderRadius: 2 }}
                size="large"
                variant="contained"
                onClick={() => setMetamaskTransaction(true)}
              >
                Continue
              </Button>
            </>
          )}

          <Typography variant="caption" sx={{ textAlign: 'center' }}>
            or confirm payment information
          </Typography>

          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

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
          <TextField
            fullWidth
            variant="filled"
            sx={{ fontFeatureSettings: "'ss06' on", letterSpacing: '-0.02em' }}
            InputProps={{ disableUnderline: true }}
            type="text"
            label="Transaction Hash"
            autoComplete="new-password"
            {...getFieldProps('txnHash')}
            error={Boolean(touched.txnHash && errors.txnHash)}
            helperText={touched.txnHash && errors.txnHash}
          />
          <LoadingButton
            sx={{ borderRadius: 2 }}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="inherit"
            disabled={!isValid || !values.senderEmail || !values.senderName || !values.txnHash}
            loading={isSubmitting}
          >
            Confirm completed transaction
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  ) : (
    <MetamaskForm myWallet={connection?.address} payment={payment} />
  );
}
