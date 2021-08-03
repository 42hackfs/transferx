import { capitalCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  Button,
  ButtonProps,
  Card,
  Stack,
  Link,
  Alert,
  Tooltip,
  Container,
  Typography
} from '@material-ui/core';
// routes
import { PATH_AUTH } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
// layouts
import AuthLayout from '../../layouts/AuthLayout';
// components
import Page from '../../components/Page';
import { varFadeIn, varFadeInUp, varWrapEnter, varFadeInRight } from '../../components/animate';
import { MHidden } from '../../components/@material-extend';
import AuthFirebaseSocials from '../../components/authentication/AuthFirebaseSocial';
import NftBackground from '../../components/NftBackground';
import Who from '../Who';
// ----------------------------------------------------------------------
const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 650,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

const ButtonStyle = styled((props: ButtonProps) => <Button {...props} />)(({ theme }) => ({
  // backgroundColor: 'white',
  // color: 'black',
  // position: 'relative',

  position: 'absolute',
  left: 20,
  top: 25,
  // top: 25,
  // right: 30,
  // zIndex: 1000,
  [theme.breakpoints.down('sm')]: {
    top: 18,
    left: 20
  }
}));

// ----------------------------------------------------------------------

export default function Login() {
  // const { method } = useAuth();

  return (
    <>
      <NftBackground />
      {/* <ButtonStyle
        onClick={(e) => {
          e.preventDefault();
          window.open(
            'https://www.producthunt.com/posts/show-my-nft-on-twitter?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-show-my-nft-on-twitter'
          );
        }}
        size="small"
        variant="contained"
      >
        JOIN US ON PH
      </ButtonStyle> */}

      <RootStyle title="Welcome | Show My NFT">
        <ButtonStyle
          onClick={(e) => {
            e.preventDefault();
            window.open(
              'https://www.producthunt.com/posts/show-my-nft-on-twitter?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-show-my-nft-on-twitter'
            );
          }}
          size="small"
          variant="contained"
        >
          Join us on PH
        </ButtonStyle>

        {/* <ButtonStyle
            variant="contained"
            color="secondary"
            onClick={(e) => {
              e.preventDefault();
              window.open(
                'https://www.producthunt.com/posts/show-my-nft-on-twitter?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-show-my-nft-on-twitter'
              );
            }}
          >
            JOIN US ON PRODUCT HUNT
          </ButtonStyle> */}
        {/* </Stack> */}
        <MHidden width="smDown">
          <Who />
        </MHidden>
        <Container maxWidth="lg">
          <ContentStyle>
            <motion.div variants={varFadeInRight}>
              <Card>
                <Stack sx={{ padding: 4 }} spacing={3} direction="column">
                  <Typography variant="h3">Connect your wallet</Typography>
                  <Typography variant="h6">Welcome to the future, bro.</Typography>
                  <Typography variant="body1">
                    Here, we display our Crypto Art on Twitter. Every day, your profile picture is
                    updated randomly based on your NFT collection. Connect with Twitter, sync your
                    OpenSea wallet and choose your favorites NFTs. We do the rest.
                  </Typography>
                  <AuthFirebaseSocials />
                </Stack>
              </Card>
            </motion.div>
          </ContentStyle>
        </Container>
      </RootStyle>
    </>
  );
}
