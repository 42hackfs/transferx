/* eslint-disable import/no-duplicates */
import { createContext, ReactNode, useEffect, useReducer, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';
// import 'firebase/functions';

// // @types
// import { constantCase } from 'constant-case';
// import { PATH_PAGE } from '../routes/paths';
// import { ActionMap, AuthState, AuthUser, FirebaseContextType } from '../@types/authentication';
// //
// import { firebaseConfig } from '../config';
// import { Payment } from '../hooks/usePayment';
// // ----------------------------------------------------------------------
// // require('firebase/functions');

// const ADMIN_EMAILS = ['demo@minimals.cc'];

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
//   firebase.firestore();
// }

// export const db = firebase.firestore();

// // const sendLinkEmail = firebase.functions().httpsCallable('sendLinkEmail');

// export const addToken = firebase.functions().httpsCallable('addToken');

// export const addWallet = firebase.functions().httpsCallable('addWallet');

// // export const UpdateProfileImage = firebase.functions().httpsCallable('UpdateProfileImage');

// // export const ImageToBase64 = firebase.functions().httpsCallable('ImageToBase64');

// export const checkPassword = firebase.functions().httpsCallable('checkPassword');

// // export const nftListing = firebase.functions().httpsCallable('nftListing');

// export const savePayment = async (paymentId: string, senderInfo: any) => {
//   try {
//     const snapshot = await db.collection('pendingPayment').doc(paymentId).get();
//     const paymentData = snapshot.data();
//     const doc = await db
//       .collection('confirmedPayment')
//       .doc(paymentId)
//       .set({
//         ...paymentData,
//         ...senderInfo,
//         confirmedAt: new Date().toISOString()
//       });
//     // await sendPaymentConfirmation({ email: senderInfo.senderEmail });
//     // await sendPaymentReception({ email: paymentData?.requesterEmail, paymentId });
//     return true;
//   } catch (e) {
//     console.log(e);
//     return null;
//   }
// };

// // // If Run Firebase Emulators
// // if (process.env.NODE_ENV !== 'production') {
// //   firebase.auth().useEmulator('http://localhost:9099');
// //   firebase.functions().useEmulator('localhost', 5001);
// //   db.useEmulator('localhost', 8080);
// // }
// const initialState: AuthState = {
//   isAuthenticated: false,
//   isInitialized: false,
//   user: null
// };

// enum Types {
//   Initial = 'INITIALISE'
// }

// type FirebaseAuthPayload = {
//   [Types.Initial]: {
//     isAuthenticated: boolean;
//     user: AuthUser;
//   };
// };

// type FirebaseActions = ActionMap<FirebaseAuthPayload>[keyof ActionMap<FirebaseAuthPayload>];

// const reducer = (state: AuthState, action: FirebaseActions) => {
//   if (action.type === 'INITIALISE') {
//     const { isAuthenticated, user } = action.payload;
//     return {
//       ...state,
//       isAuthenticated,
//       isInitialized: true,
//       user
//     };
//   }

//   return state;
// };

// const AuthContext = createContext<FirebaseContextType | null>(null);

// function AuthProvider({ children }: { children: ReactNode }) {
//   const [profile, setProfile] = useState<firebase.firestore.DocumentData | undefined>();
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const navigate = useNavigate();

//   useEffect(
//     () =>
//       firebase.auth().onAuthStateChanged((user) => {
//         if (user) {
//           const docRef = db.collection('users').doc(user.uid);
//           docRef
//             .get()
//             .then((doc) => {
//               if (doc.exists) {
//                 setProfile(doc.data());
//                 const user = doc.data();
//                 user?.activated ? navigate(PATH_PAGE.off) : navigate(PATH_PAGE.home);
//               }
//             })
//             .catch((error) => {
//               console.error(error);
//             });

//           dispatch({
//             type: Types.Initial,
//             payload: { isAuthenticated: true, user }
//           });
//         } else {
//           dispatch({
//             type: Types.Initial,
//             payload: { isAuthenticated: false, user: null }
//           });
//         }
//       }),
//     [dispatch]
//   );

//   const login = (email: string, password: string) =>
//     firebase.auth().signInWithEmailAndPassword(email, password);

//   const loginWithGoogle = () => {
//     const provider = new firebase.auth.GoogleAuthProvider();
//     return firebase.auth().signInWithPopup(provider);
//   };

//   const loginWithFaceBook = () => {
//     const provider = new firebase.auth.FacebookAuthProvider();
//     return firebase.auth().signInWithPopup(provider);
//   };

//   const loginWithTwitter = () => {
//     const provider = new firebase.auth.TwitterAuthProvider();
//     return firebase.auth().signInWithPopup(provider);
//   };

//   const register = (email: string, password: string, firstName: string, lastName: string) =>
//     firebase
//       .auth()
//       .createUserWithEmailAndPassword(email, password)
//       .then((res) => {
//         firebase
//           .firestore()
//           .collection('users')
//           .doc(res.user?.uid)
//           .set({
//             uid: res.user?.uid,
//             email,
//             displayName: `${firstName} ${lastName}`
//           });
//       });

//   const logout = async () => {
//     await firebase.auth().signOut();
//   };

//   const resetPassword = async (email: string) => {
//     await firebase.auth().sendPasswordResetEmail(email);
//   };

//   async function nftListing(ownerAddress: string) {
//     const nftList: string[] = [];

//     const url = `https://api.opensea.io/api/v1/assets?owner=${ownerAddress}&order_direction=desc&offset=0&limit=50`;
//     const options = { method: 'GET' };

//     const res = await fetch(url, options);

//     console.log('res', res);
//     const ownerNfts = (await res.json()) as { assets: { image_url: string; [x: string]: any }[] };
//     console.log('ownerNfts', ownerNfts);
//     ownerNfts.assets.forEach((nft) => {
//       nftList.push(nft.image_url);
//     });
//     return nftList;
//   }

//   const addWallet = async (address: string) => {
//     // get nfts
//     try {
//       const nftList = await nftListing(address);
//       console.log('nftList', nftList);

//       setProfile((prev) => ({ ...prev, wallet: address, nftList }));
//       // await db.collection('users').doc(state.user?.uid).update({
//       //   wallet: ownerAddress,
//       //   nftList
//       // });
//     } catch (e) {
//       console.log(e);
//     }
//     // display and let choose
//     // when chosen store list of nfts, address and chosen indexes in firebase
//   };

//   const saveSettings = async (selected: number[]) => {
//     setProfile((prev) => ({ ...prev, selectedNfts: selected, activated: true }));
//     db.doc(`users/${auth.uid}`).update({
//       wallet: profile?.wallet,
//       selectedNfts: selected,
//       nftList: profile?.nftList,
//       activated: true
//     });
//   };

//   const updateProfile = (data: { [x: string]: any }) => {
//     const newData = { ...profile, ...data };
//     db.doc(`users/${auth.uid}`)
//       .update(newData)
//       .then(() => setProfile(newData))
//       .catch((err) => console.log(err));
//   };

//   const auth = { ...state.user };

//   return (
//     <AuthContext.Provider
//       value={{
//         ...state,
//         method: 'firebase',
//         user: {
//           id: auth.uid,
//           email: auth.email,
//           photoURL: auth.photoURL || profile?.photoURL,
//           displayName: auth.displayName || profile?.displayName,
//           role: ADMIN_EMAILS.includes(auth.email) ? 'admin' : 'user',
//           sharedOnTwitter: profile?.sharedOnTwitter,
//           activated: profile?.activated,
//           wallet: profile?.wallet,
//           token: profile?.token,
//           secret: profile?.secret,
//           nftList: profile?.nftList,
//           selectedNfts: profile?.selectedNfts
//         },
//         login,
//         register,
//         loginWithGoogle,
//         loginWithFaceBook,
//         loginWithTwitter,
//         logout,
//         resetPassword,
//         addWallet,
//         saveSettings,
//         updateProfile
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export { AuthContext, AuthProvider };
