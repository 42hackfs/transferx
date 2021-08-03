import { useState, useEffect } from 'react';
import { useParams, useLocation, Link as RouterLink } from 'react-router-dom';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button
} from '@material-ui/core';

import { DialogAnimate } from '../../animate';
import PasswordForm from './PasswordForm';

export default function Modal({ checkPw, setCheckPw }: any) {
  const [open, setOpen] = useState(false);
  const { paymentId = '' } = useParams();
  useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, 1000);
  }, []);
  return (
    <DialogAnimate open={open}>
      <DialogTitle sx={{ fontFamily: 'Roobert' }} id="alert-dialog-title">
        Password to access the dashboard
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <PasswordForm checkPw={checkPw} setCheckPw={setCheckPw} />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="text" to={`/link/${paymentId}`} component={RouterLink}>
          Back
        </Button>
      </DialogActions>
    </DialogAnimate>
  );
}
