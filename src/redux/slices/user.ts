import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
// import axios from '../../utils/axios';
import {
  //   Friend,
  //   Gallery,
  Profile,
  //   UserPost,
  //   Follower,
  //   UserData,
  //   CreditCard,
  //   UserInvoice,
  //   UserManager,
  //   UserAddressBook,
  NotificationSettings
} from '../../@types/user';

// // ----------------------------------------------------------------------

type UserState = {
  isLoading: boolean;
  error: boolean;
  myProfile: null | Profile;
  notifications: NotificationSettings | null;
};

const initialState: UserState = {
  isLoading: false,
  error: false,
  myProfile: null,
  notifications: null
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PROFILE
    getProfileSuccess(state, action) {
      state.isLoading = false;
      state.myProfile = action.payload;
    },

    // GET NOTIFICATIONS
    getNotificationsSuccess(state, action) {
      state.isLoading = false;
      state.notifications = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
// export const { onToggleFollow, deleteUser } = slice.actions;

// // ----------------------------------------------------------------------

// export function getProfile() {
//   return async () => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.get('/api/user/profile');
//       dispatch(slice.actions.getProfileSuccess(response.data.profile));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

// // ----------------------------------------------------------------------

// export function getPosts() {
//   return async () => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.get('/api/user/posts');
//       dispatch(slice.actions.getPostsSuccess(response.data.posts));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

// // ----------------------------------------------------------------------

// export function getFollowers() {
//   return async () => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.get('/api/user/social/followers');
//       dispatch(slice.actions.getFollowersSuccess(response.data.followers));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

// // ----------------------------------------------------------------------

// export function getFriends() {
//   return async () => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.get('/api/user/social/friends');
//       dispatch(slice.actions.getFriendsSuccess(response.data.friends));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

// // ----------------------------------------------------------------------

// export function getGallery() {
//   return async () => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.get('/api/user/social/gallery');
//       dispatch(slice.actions.getGallerySuccess(response.data.gallery));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

// // ----------------------------------------------------------------------

// export function getUserList() {
//   return async () => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.get('/api/user/manage-users');
//       dispatch(slice.actions.getUserListSuccess(response.data.users));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

// // ----------------------------------------------------------------------

// export function getCards() {
//   return async () => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.get('/api/user/account/cards');
//       dispatch(slice.actions.getCardsSuccess(response.data.cards));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

// // ----------------------------------------------------------------------

// export function getAddressBook() {
//   return async () => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.get('/api/user/account/address-book');
//       dispatch(slice.actions.getAddressBookSuccess(response.data.addressBook));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

// // ----------------------------------------------------------------------

// export function getInvoices() {
//   return async () => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.get('/api/user/account/invoices');
//       dispatch(slice.actions.getInvoicesSuccess(response.data.invoices));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

// // ----------------------------------------------------------------------

// export function getNotifications() {
//   return async () => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.get('/api/user/account/notifications-settings');
//       dispatch(slice.actions.getNotificationsSuccess(response.data.notifications));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

// // ----------------------------------------------------------------------

export function getUsers() {
  // return async () => {
  //   dispatch(slice.actions.startLoading());
  //   try {
  //     const response = await axios.get('/api/user/all');
  //     dispatch(slice.actions.getUsersSuccess(response.data.users));
  //   } catch (error) {
  //     dispatch(slice.actions.hasError(error));
  //   }
  // };
}
