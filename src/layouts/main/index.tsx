import { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';

import { useLocation, Outlet } from 'react-router-dom';
// material
import { Box, Link, Container, Typography, Theme, useMediaQuery } from '@material-ui/core';
// components
import Logo from '../../components/Logo';
//
import NftBackground from '../../components/NftBackground';
import MainNavbar from './MainNavbar';

// ----------------------------------------------------------------------

export default function MainLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  const smallDown = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'));
  return (
    <>
      <NftBackground />
      <Link href="/">
        <img
          src="/favicon/logo.svg"
          alt="logo"
          width="47.7"
          height="40"
          style={{
            position: 'absolute',
            top: smallDown ? 10 : 25,
            left: smallDown ? 25 : 50,
            zIndex: 1000
          }}
        />
      </Link>
      {/* <MainNavbar /> */}
      {/* <Navbar /> */}
      <div>
        <Outlet />
      </div>
    </>
  );
}
