// import { ethers } from 'ethers';
import { useState, useRef, forwardRef } from 'react';
import { Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import plusOutline from '@iconify/icons-eva/plus-circle-outline';
import NumberFormat from 'react-number-format';

// material
import { LoadingButton, MobileDatePicker } from '@material-ui/lab';
// import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Typography, Button, Stack, Alert, Autocomplete, Chip, Box } from '@material-ui/core';

import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { OutlinedInputProps } from '@material-ui/core/OutlinedInput';
import PopoverFieldInfo from '../../PopoverFieldInfo';
import { MHidden } from '../../@material-extend';
import { tokens } from '../../../utils/supportedTokens';
import 'firebase/auth';

// ----------------------------------------------------------------------

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export default function LandingSendPayment({ formik }: { formik: any }) {
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack sx={{ padding: 4 }} spacing={3}>
          <Typography sx={{ fontFamily: 'Roobert', textAlign: 'center' }} variant="h6">
            What is your openSea wallet address?
          </Typography>

          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

          <TextField
            fullWidth
            type="text"
            variant="outlined"
            // InputProps={{ disableUnderline: true, style: { color: '#fff', borderColor: 'white' } }}
            InputLabelProps={{ style: { color: '#fff' } }}
            label="Your openSea Wallet Address"
            autoComplete="new-password"
            placeholder="0x6b175474e89094c44da98b954eedeac495271d0f"
            {...getFieldProps('requesterAddress')}
            error={Boolean(touched.requesterAddress && errors.requesterAddress)}
            helperText={touched.requesterAddress && errors.requesterAddress}
          />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            color="inherit"
          >
            Connect to OpenSea
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
