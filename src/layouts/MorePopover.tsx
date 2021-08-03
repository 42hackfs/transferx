import { useRef, useState } from 'react';
import { useLocation } from 'react-router';
// material
import { Box, MenuItem, ListItemText, Link } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';
// components
import MenuPopover from '../components/MenuPopover';

// ----------------------------------------------------------------------

const options = [
  // {
  //   value: 'qr',
  //   href: '#',
  //   label: 'Show QR Code',
  //   icon: '/static/icons/ic_flag_fr.svg'
  // },
  // {
  //   value: 'dashboard',
  //   href: 'dashboard',
  //   label: 'View Dashboard',
  //   icon: '/static/icons/ic_flag_fr.svg'
  // },
  {
    value: 'paymentLink',
    href: '/',
    label: 'Create Payment Link',
    icon: '/static/icons/ic_flag_fr.svg'
  },
  {
    value: 'help',
    href: 'https://baptlac.gitbook.io/fundx/',
    label: 'Help',
    icon: '/static/icons/ic_flag_fr.svg'
  }
];

interface MorePopoverProps {
  qrDialogOpen: (arg0: boolean) => void;
}

export default function MorePopover({ qrDialogOpen }: MorePopoverProps) {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <>
      <IconButton
        ref={anchorRef}
        size="small"
        style={{
          backgroundColor: 'white',
          color: 'black'
        }}
        aria-label="menu"
        onClick={() => setOpen(true)}
      >
        <MoreHorizIcon />
      </IconButton>

      <MenuPopover open={open} onClose={() => setOpen(false)} anchorEl={anchorRef.current}>
        <Box sx={{ py: 1 }}>
          <MenuItem
            key="qr"
            component={Link}
            onClick={() => {
              setOpen(false);
              qrDialogOpen(true);
            }}
            sx={{ py: 1, px: 2.5 }}
          >
            {/* <ListItemIcon>
                <Box component="img" alt={option.label} src={option.icon} />
              </ListItemIcon> */}

            <ListItemText primaryTypographyProps={{ variant: 'body2' }}>Show QR Code</ListItemText>
          </MenuItem>
          <MenuItem
            key="dashboard"
            component={Link}
            href={`${pathname}/dashboard`}
            onClick={() => {
              setOpen(false);
            }}
            sx={{ py: 1, px: 2.5 }}
          >
            {/* <ListItemIcon>
                <Box component="img" alt={option.label} src={option.icon} />
              </ListItemIcon> */}

            <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
              View DashBoard
            </ListItemText>
          </MenuItem>
          {options.map((option) => (
            <MenuItem
              key={option.value}
              component={Link}
              href={option.href}
              onClick={() => {
                setOpen(false);
              }}
              sx={{ py: 1, px: 2.5 }}
            >
              {/* <ListItemIcon>
                <Box component="img" alt={option.label} src={option.icon} />
              </ListItemIcon> */}

              <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
                {option.label}
              </ListItemText>
            </MenuItem>
          ))}
        </Box>
      </MenuPopover>
    </>
  );
}
