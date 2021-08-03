import { motion } from 'framer-motion';
import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
// material
import {
  Box,
  Container,
  Stack,
  StackProps,
  Button,
  Typography,
  Grid,
  Card
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

// components
import Page from '../components/Page';
import { varFadeIn, varFadeInUp, varWrapEnter, varFadeInRight } from '../components/animate';
import NftCard from '../components/NftCard';

import useAuth from '../hooks/useAuth';

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
    maxWidth: 800,
    margin: 'auto',
    textAlign: 'center',
    position: 'relative',
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(8)
  })
);

// ----------------------------------------------------------------------

export default function LandingPage() {
  const { user } = useAuth();
  console.log('USER', user);

  // const [selected, setSelected] = useState<number[]>(
  //   user?.selectedNfts || [...Array(user?.nftList?.length || 0).keys()]
  // );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  // if (!user || !user.nftList) navigate('/');

  // const selectNft = (index: number) => () => {
  //   console.log('INDEX', index);
  //   console.log('SEL', selected);

  //   setSelected((prev) =>
  //     prev.includes(index) ? prev.filter((el) => el !== index) : [...prev, index]
  //   );
  // };

  const onFinish = async () => {
    // if (Object.keys(selected).length === 0) return;
    //  setup
    setIsSubmitting(true);
    try {
      // await saveSettings(selected);
      setIsSubmitting(false);
      // setTimeout(() => navigate('/off'), 200);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  return (
    <RootStyle title="Show My NFTs" id="move_top">
      <DivStyle initial="initial" animate="animate" variants={varWrapEnter}>
        <Container maxWidth="lg">
          <ContentStyle>
            <Card
              sx={{
                padding: 2,
                height: '60vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <Box padding={2}>
                <Typography variant="h4" color="inherit">
                  Choose your NFTs
                </Typography>
              </Box>
            </Card>
          </ContentStyle>
        </Container>
      </DivStyle>
    </RootStyle>
  );
}
