// import { ethers } from 'ethers';
import { useState, useRef } from 'react';
import { Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import plusOutline from '@iconify/icons-eva/plus-circle-outline';
// material
import { LoadingButton, MobileDatePicker } from '@material-ui/lab';
// import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Typography, Stack, Alert, TextField, Autocomplete, Chip, Box } from '@material-ui/core';

import PopoverFieldInfo from '../components/PopoverFieldInfo';
import { MHidden } from '../@material-extend';

// import { tokens } from '../../../utils/supportedTokens';
// ----------------------------------------------------------------------

export type Token = { label: string; value: string; icon: string; address?: string };

export const tokens: Token[] = [
  {
    label: 'USDC',
    value: 'USDC',
    icon: '/static/icons/usdc-logo.svg',
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
  },
  {
    label: 'USDT',
    value: 'USDT',
    icon: '/static/icons/tether-usdt-logo.svg',
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7'
  },
  {
    label: 'DAI',
    value: 'DAI',
    icon: '/static/icons/multi-collateral-dai-dai-logo.svg',
    address: '0x6b175474e89094c44da98b954eedeac495271d0f'
  },
  {
    label: 'ETH',
    value: 'ETH',
    icon: '/static/icons/ethereum-eth-logo.svg'
  },
  {
    label: 'WBTC',
    value: 'WBTC',
    icon: '/static/icons/wrapped-bitcoin-wbtc-logo.svg',
    address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'
  }
];

export default function LandingSendPayment({ formik }: { formik: any }) {
  const emailRef = useRef(null);
  const dateRef = useRef(null);
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
  const [showMemo, setShowMemo] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [showEmailInfo, setShowEmailInfo] = useState(false);
  const [showDateInfo, setShowDateInfo] = useState(true);

  // const checkFounderAddress = async () => {
  //   alert('set address checker');
  //   // get the address from the field

  //   // const provider = ethers.providers.getDefaultProvider(
  //   //   'https://mainnet.infura.io/v3/fd94adefa562421f8a3eb6b3e9621b3c'
  //   // );
  //   // const resolver = provider.resolveName(address);
  //   // if (resolver != null) {
  //   //   address = resolver;
  //   // }

  //   // const isAddress = ethers.utils.isAddress(address);

  //   // if (isAddress) {
  //   //   try {
  //   //     const check = await ethers.utils.getAddress(address));
  //   //   } catch (error) {
  //   //     alert(error);
  //   //   }
  //   // } else {
  //   //   alert('The address is not right');
  //   // }
  // };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack sx={{ padding: 4 }} spacing={3}>
          <Typography variant="h6">Add your files</Typography>

          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

          {/* <TextField
            ref={emailRef}
            fullWidth
            type="text"
            label="Requester's Email"
            {...getFieldProps('requesterEmail')}
            error={Boolean(touched.requesterEmail && errors.requesterEmail)}
            helperText={touched.requesterEmail && errors.requesterEmail}
            onFocus={() => setShowEmailInfo(true)}
            onBlur={() => setShowEmailInfo(false)}
          />
          <MHidden width="mdDown">
            {showEmailInfo && (
              <PopoverFieldInfo open={showEmailInfo} anchorEl={emailRef.current}>
                <Box sx={{ p: 2 }}>
                  <Typography variant="body2">
                    We will send you your payment link and the password to track completed payments.
                    You will need to verify your email so we know it’s really you. This will also
                    let your recipient know it comes from you.
                  </Typography>
                </Box>
              </PopoverFieldInfo>
            )}
          </MHidden>
          <TextField
            fullWidth
            type="text"
            label="Requester's Name"
            autoComplete="name"
            {...getFieldProps('requesterName')}
            error={Boolean(touched.requesterName && errors.requesterName)}
            helperText={touched.requesterName && errors.requesterName}
          />
          <TextField
            fullWidth
            type="text"
            label="Requester's Address"
            autoComplete="new-password"
            placeholder="0x6b175474e89094c44da98b954eedeac495271d0f"
            {...getFieldProps('requesterAddress')}
            error={Boolean(touched.requesterAddress && errors.requesterAddress)}
            helperText={touched.requesterAddress && errors.requesterAddress}
          />
          <Stack direction="row" spacing={2}>
            <Autocomplete
              fullWidth
              // disablePortal
              defaultValue={tokens[0]}
              autoHighlight
              options={tokens}
              getOptionLabel={(option) => option.label}
              renderOption={(props, option) => (
                <li {...props}>
                  <Stack direction="row" spacing={2}>
                    <img
                      height={20}
                      width={20}
                      key={option.icon}
                      alt="logo card"
                      src={option.icon}
                    />
                    <Typography>{option.label}</Typography>
                  </Stack>
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Token"
                  inputProps={{
                    ...getFieldProps('token'),
                    ...params.inputProps,
                    autoComplete: 'new-password'
                  }}
                />
              )}
            />
            <TextField
              fullWidth
              type="number"
              label="Amount"
              {...getFieldProps('amount')}
              error={Boolean(touched.amount && errors.amount)}
              helperText={touched.amount && errors.amount}
            />
          </Stack> */}
          {showMemo ? (
            <TextField
              fullWidth
              type="text"
              label="Payment Memo"
              {...getFieldProps('memo')}
              error={Boolean(touched.memo && errors.memo)}
              helperText={touched.memo && errors.memo}
              rows={3}
              multiline
            />
          ) : (
            <div>
              <Chip
                avatar={<Icon icon={plusOutline} />}
                label="Add a Message"
                onClick={() => setShowMemo(true)}
              />
            </div>
          )}
          {showDate ? (
            <div ref={dateRef}>
              <MobileDatePicker
                label="Due Date"
                value={formik.values.due || null}
                onChange={(val) => {
                  if (val) {
                    formik.setFieldValue('due', val);
                    setShowDateInfo(false);
                  }
                }}
                // @ts-ignore
                renderInput={(params) => <TextField fullWidth {...params} margin="normal" />}
              />
              <MHidden width="mdDown">
                {showDateInfo && dateRef.current && (
                  <PopoverFieldInfo open={true} anchorEl={dateRef.current}>
                    <Box sx={{ p: 2 }}>
                      <Typography variant="body2">
                        After this date, your link won’t be active anymore and your file will be
                        burnt.
                      </Typography>
                      <Typography variant="body2">
                        We will show this information to your recipient.
                      </Typography>
                    </Box>
                  </PopoverFieldInfo>
                )}
              </MHidden>
            </div>
          ) : (
            <div>
              <Chip
                avatar={<Icon icon={plusOutline} />}
                label="Add an Expiration Date"
                onClick={() => {
                  setShowDate(true);
                  formik.setFieldValue('due', new Date().getTime());
                }}
              />
            </div>
          )}
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            color="inherit"
            // onClick={() => checkFounderAddress()}
          >
            Get a link
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
