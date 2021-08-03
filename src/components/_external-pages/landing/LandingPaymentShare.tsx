import { Form, FormikProvider } from 'formik';

// material
import { LoadingButton } from '@material-ui/lab';
// import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Typography, Stack, Alert, Divider } from '@material-ui/core';

import TextField, { TextFieldProps } from '@material-ui/core/TextField';

import 'firebase/auth';

// ----------------------------------------------------------------------

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export default function LandingPaymentShare({ formik2 }: { formik2: any }) {
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik2;
  return (
    <FormikProvider value={formik2}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack sx={{ padding: 4 }} spacing={3}>
          <Typography sx={{ fontFamily: 'Roobert', textAlign: 'center' }} variant="h6">
            The tool is free. To get access, you only need to tweet about how excited you are to
            show your NFTs in your profile picture 😇
          </Typography>

          <LoadingButton
            fullWidth
            size="large"
            type="button"
            variant="contained"
            color="inherit"
            onClick={(e) => {
              e.preventDefault();
              window.open(
                'https://twitter.com/intent/tweet?text=From%20now,%20I%20will%20display%20some%20of%20my%20Crypto%20Art%20in%20my%20profile%20picture.%20Every%20day%20I%20will%20show%20you%20a%20new%20one.%20I%27m%20using%20@showmynft%20to%20automate%20everything.%20https://show-my-nft.com/'
              );
            }}
          >
            Make a Tweet
          </LoadingButton>
          <Divider sx={{ backgroundColor: 'white' }} />
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

          <TextField
            fullWidth
            type="text"
            variant="outlined"
            InputLabelProps={{ style: { color: 'white' } }}
            label="The link of your tweet"
            autoComplete="new-password"
            placeholder="https://twitter.com/mathisgrosjean/status/1418857909790908417/photo/1"
            {...getFieldProps('tweetUrl')}
            error={Boolean(touched.tweetUrl && errors.tweetUrl)}
            helperText={touched.tweetUrl && errors.tweetUrl}
          />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            color="inherit"
          >
            Check my Tweet to Access App
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
