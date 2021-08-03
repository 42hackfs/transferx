import faker from 'faker';
import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// material
import { useTheme } from '@material-ui/core/styles';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import {
  Box,
  Card,
  Table,
  Button,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  TableContainer
} from '@material-ui/core';
// utils
import { fCurrency } from '../../../utils/formatNumber';
//
import Label from '../../Label';
import Scrollbar from '../../Scrollbar';
import MoreMenuButton from '../../MoreMenuButton';
import { db } from '../../../contexts/FirebaseContext';
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

const PAYMENTS = [
  {
    id: faker.datatype.uuid(),
    stakeholder: 'pending',
    transaction: 'pending',
    amount: 'pending',
    status: 'in_progess',
    date: 'pending'
  }
];

export default function AppNewInvoice({ paymentId }: { paymentId: string }) {
  const theme = useTheme();
  const [stakeholder, setStakeholder] = useState('');
  const [transaction, setTransaction] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('none');
  const [date, setDate] = useState('');

  useEffect(() => {
    db.collection('confirmedPayment')
      .doc(paymentId)
      .get()
      .then((doc: any) => {
        if (doc.exists) {
          console.log('Document data:', doc.data());
          const data = doc.data();
          setStakeholder(data.senderName);
          setTransaction(data.txnHash);
          setAmount(data.amount);
          setStatus('success');
          setDate(data.confirmedAt);
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document! set to pending transaction');
          setStakeholder('none');
          setTransaction('none');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }, []);

  return (
    <Card>
      <CardHeader title="Payment" sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Stakeholder</TableCell>
                <TableCell>Transaction</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{stakeholder}</TableCell>
                <TableCell>{transaction}</TableCell>
                <TableCell>{fCurrency(amount)}</TableCell>
                <TableCell>
                  <Label
                    variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                    color={
                      (status === 'pending' && 'warning') ||
                      (status === 'none' && 'error') ||
                      'success'
                    }
                  >
                    {sentenceCase(status)}
                  </Label>
                </TableCell>
                <TableCell>{date}</TableCell>
                {/* <TableCell align="right">
                  <MoreMenuButton />
                </TableCell> */}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2 }}>
        {' '}
        <p> </p>{' '}
      </Box>
    </Card>
  );
}
