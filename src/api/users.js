import axios from 'axios';
import store from '../store/store';
import {ApiErrorException, ApiErrorTypes} from './utils/errors';
export default class Users {
  getProfileData = async (userId) => {
    try {
      const res = await axios.get(`users/${userId}`);
      return res.data;
    } catch (error) {
      console.log('users  error', error.response);
      if (error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.message,
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };

  updateProfileData = async (data) => {
    try {
      const res = await axios.post(
        `users/${store.getState().auth.userData?.user?.id}`,
        data,
      );
      console.log(res, 'update profile res');
      return res.data;
    } catch (error) {
      console.log('users  error', error.response);
      if (error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.message,
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };
  updateBank = async (data) => {
    try {
      const res = await axios.patch(
        `users/${store.getState().auth.userData?.user?.id}/bank-data`,
        data,
      );
      console.log(res, 'update profile res');
      return res.data;
    } catch (error) {
      console.log('users  error', error.response);
      if (error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.message,
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };

  getHobbies = async () => {
    try {
      const res = await axios.get('hobbies');
      return res.data;
    } catch (error) {
      console.log('users  error', error.response);
      if (error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.message,
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };

  updateHobbies = async (data) => {
    try {
      const res = await axios.patch(
        `users/${store.getState().auth.userData?.user?.id}/hobbies`,
        data,
      );
      console.log(res, 'update profile res');
      return res.data;
    } catch (error) {
      console.log('users  error', error.response);
      if (error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.message,
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };

  updateCar = async (data) => {
    try {
      const res = await axios.post(
        `users/${store.getState().auth.userData?.user?.id}/car-data`,
        data,
      );
      console.log(res, 'update profile res');
      return res.data;
    } catch (error) {
      console.log('users  error', error.response);
      if (error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.message,
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };

  changeLang = async (data) => {
    try {
      const res = await axios.post(
        `users/${store.getState().auth.userData?.user?.id}/change-locale`,
        data,
      );
      console.log(res, 'changeLang res');
      return res.data;
    } catch (error) {
      console.log('changeLang  error', error.response);
      if (error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.message,
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };
}
