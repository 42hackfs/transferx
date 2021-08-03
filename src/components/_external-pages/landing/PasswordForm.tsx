import * as Yup from 'yup';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Link,
  Stack,
  Alert,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  Box,
  FormControlLabel
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
//
import { MIconButton } from '../../@material-extend';

import { checkPassword } from '../../../contexts/FirebaseContext';

// ----------------------------------------------------------------------
type InitialValues = {
  password: string;
  remember: boolean;
  afterSubmit?: string;
};

export default function PasswordForm({ checkPw, setCheckPw }: any) {
  const { paymentId = '' } = useParams();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const LoginSchema = Yup.object().shape({
    // email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });
  const formik = useFormik<InitialValues>({
    initialValues: {
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        const pass = values.password;
        const response = await checkPassword({ data: { pass, paymentId } });
        if (response.data.verified === true) {
          setCheckPw(true);
          enqueueSnackbar('Valid password', {
            variant: 'success',
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            )
          });
        } else {
          enqueueSnackbar('Invalid Password', {
            variant: 'error',
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            )
          });
        }
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

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
          <TextField
            fullWidth
            variant="filled"
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              disableUnderline: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>
        <Box mt={2} display="flex">
          <LoadingButton
            sx={{ borderRadius: 2 }}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Access dashboard
          </LoadingButton>
        </Box>
      </Form>
    </FormikProvider>
  );
}
