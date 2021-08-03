import React from 'react';
// Firebase
// import { db } from '../contexts/FirebaseContext';

interface Data {
  error: Error | null;
  loading: boolean;
  payment: Payment;
}

export interface Payment {
  requesterEmail: string;
  requesterName: string;
  requesterAddress: string;
  token: string | 'USDC' | 'USDT' | 'DAI';
  amount?: number;
  memo?: string;
  due?: string;
  afterSubmit?: string;
}

export function usePayment(id: string) {
  const [data, setData] = React.useState<Data>({
    error: null,
    loading: true,
    payment: {
      requesterEmail: '',
      requesterName: '',
      requesterAddress: '',
      token: ''
    }
  });

  // React.useEffect(() => {
  //   const unsubscribe = db
  //     .collection('pendingPayment')
  //     .doc(id)
  //     .onSnapshot(
  //       (snapshot) => {
  //         const response = snapshot.data();
  //         setData({
  //           error: null,
  //           loading: false,
  //           payment: {
  //             requesterEmail: response?.requesterEmail,
  //             requesterName: response?.requesterName,
  //             requesterAddress: response?.requesterAddress,
  //             token: response?.token,
  //             amount: response?.amount,
  //             memo: response?.memo,
  //             due: response?.due,
  //             afterSubmit: response?.afterSubmit
  //           }
  //         });
  //       },
  //       (error) => {
  //         setData({
  //           error,
  //           loading: false,
  //           payment: {
  //             requesterEmail: '',
  //             requesterName: '',
  //             requesterAddress: '',
  //             token: ''
  //           }
  //         });
  //       }
  //     );

  //   return unsubscribe;
  // }, []);

  return data;
}
