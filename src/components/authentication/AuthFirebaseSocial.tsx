import firebase from 'firebase/app';
import 'firebase/auth';
import { Icon } from '@iconify/react';
import googleFill from '@iconify/icons-eva/google-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
// material
import { Grid, Button, Divider, Typography } from '@material-ui/core';
// hooks
import useAuth from '../../hooks/useAuth';
import { addToken } from '../../contexts/FirebaseContext';

// ----------------------------------------------------------------------

export default function AuthWithSocial() {
  const { loginWithGoogle, loginWithFaceBook, loginWithTwitter } = useAuth();

  // const handleLoginGoogle = async () => {
  //   try {
  //     await loginWithGoogle?.();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleLoginFaceBook = async () => {
  //   try {
  //     await loginWithFaceBook?.();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleLoginTwitter = async () => {
    try {
      const result = await loginWithTwitter?.();

      const credential = result.credential as firebase.auth.OAuthCredential;
      // console.log(credential);
      // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
      // You can use these server side with your app's credentials to access the Twitter API.
      const token = credential?.accessToken;
      const { secret } = credential;

      // The signed-in user info.
      const { user } = result;
      const id = user?.uid;
      // console.log('user token and secret', id, token, secret);
      // const { uid } = user;
      addToken({ data: { token, id, secret } });
    } catch (error) {
      console.error(error);
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // // The email of the user's account used.
      // const { email } = error;
      // // The firebase.auth.AuthCredential type that was used.
      // const { credential } = error;
    }
  };

  return (
    <Button fullWidth size="large" color="inherit" variant="contained" onClick={handleLoginTwitter}>
      <Icon icon={twitterFill} color="#fff" height={24} />
    </Button>
  );
}
