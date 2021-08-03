import { useState } from 'react';
import { paramCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import checkFilled from '@iconify/icons-ant-design/check-circle-filled';

// material
import { Box, Card, CardProps, Typography, Stack } from '@material-ui/core';
import { experimentalStyled as styled, useTheme } from '@material-ui/core/styles';

//
// import Label from '../Label';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')(({ theme }) => ({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
}));

const CardStyle = styled((props: CardProps) => <Card {...props} />)(({ theme }) => ({
  '&.selected': {
    border: `5px solid ${theme.palette.primary.main}`
  },
  '&:hover': {
    transform: 'perspective(200px) rotateY(30deg);',
    borderLeft: '5px solid white'
  },
  '&.selected:hover': {
    borderLeft: `10px solid ${theme.palette.primary.main}`
  }
}));

// ----------------------------------------------------------------------

export default function NftCard({ href, selected }: { href: string; selected: boolean }) {
  const theme = useTheme();
  return (
    <CardStyle className={selected ? 'selected' : ''} elevation={8}>
      <Box sx={{ pt: '100%', position: 'relative', color: 'primary' }}>
        {selected && (
          <Icon
            icon={checkFilled}
            width={20}
            height={20}
            color={theme.palette.primary.main}
            style={{ position: 'absolute', zIndex: 22000, bottom: 5, right: 5 }}
          />
        )}
        <ProductImgStyle alt={href} src={href} onDragStart={(e) => e.preventDefault()} />
      </Box>
    </CardStyle>
  );
}
