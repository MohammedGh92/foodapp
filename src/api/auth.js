import axios from 'axios';
import {
  ApiActivationErrorException,
  ApiErrorException,
  ApiErrorTypes,
} from './utils/errors';
import I18n from 'react-native-i18n';
import DeviceInfo from 'react-native-device-info';
import { dataToFormData, objectToArray } from '../repo/utils/dataFormation';
export default class Auth {
  signIn = async (data) => {
    try {
      let Data = {}
      Data['username'] = data._parts[0][1];
      Data['password'] = data._parts[1][1];
      return { Data }
      const res = await axios.post('login', data);//T, No API
      return res.data;
    } catch (error) {
      console.log(
        'user Signin error',
        error.response,
        JSON.parse('Error:' + JSON.stringify(error)),
      );
      if (error.response) {
        if (error.response.data.hasOwnProperty('is_active')) {
          throw new ApiActivationErrorException(
            ApiErrorTypes.GENERAL_ERROR,
            error.response.data.is_active,
          );
        } else {
          throw new ApiErrorException(
            ApiErrorTypes.GENERAL_ERROR,
            error.response.data.message,
          );
        }
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };
  logoutPrincipalUser = async () => {
    try {
      const res = await axios.post(
        'logout',
        dataToFormData({
          mac: DeviceInfo.getUniqueId(),
        }),
      );
      return res.data;
    } catch (error) {
      console.log('user Logout error', JSON.parse(JSON.stringify(error)));
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

  register = async (data) => {
    try {
      let Data = {}

      Data['username'] = data._parts[0][1];
      Data['email'] = data._parts[1][1];
      Data['mobile'] = data._parts[2][1];
      Data['password'] = data._parts[3][1];
      return { Data }
      const res = await axios.post('register', data);//T, No API
      return res.data;
    } catch (error) {
      console.log(error.response.data, 'register error');
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

  registerData = async (data) => {
    try {
      let Data = {}
      Data['username'] = data._parts[0][1];
      Data['email'] = data._parts[1][1];
      Data['mobile'] = data._parts[2][1];
      Data['password'] = data._parts[3][1];
      return { Data }
      const res = await axios.post('register-data', data);
      return res.data;
    } catch (error) {
      console.log(error.response, 'register-data error');
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

  resetPassword = async (data) => {
    try {
      const res = await axios.post('password/reset', data);
      console.log(res, 'Reset pasword Ress');
      return res.data;
    } catch (error) {
      console.log(error.response, 'reset error');
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

  changePassword = async (data) => {
    try {
      const res = await axios.patch('password/update', data);
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error.response, 'password/update error');
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

  updateUser = async (data) => {
    try {
      const res = await axios.post('edit/profile', data);
      console.log(res, 'update user');
      return res.data.data;
    } catch (error) {
      console.log(
        JSON.parse(JSON.stringify(error)),
        error.response,
        'update user error',
      );

      if (error.response && error.response.status === 401) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          I18n.t('user-invalid'),
        );
      }
      if (error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          objectToArray(error.response.data.errors)[0][0],
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };

  forgetPassword = async (data) => {
    try {
      const res = await axios.post('forget-password', data);
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(
        JSON.parse(JSON.stringify(error)),
        error.response,
        'forgetPassword error',
      );
      if (error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          objectToArray(error.response.data.errors)[0][0],
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      }
    }
  };
  verifyCode = async (data) => {
    try {
      const res = await axios.post(
        'code/verify',
        data,
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );

      return res.data;
    } catch (error) {
      console.log(
        JSON.parse(JSON.stringify(error)),
        error.response,
        'VerifyCode error',
      );
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

  resendCode = async (data = { phone }) => {
    try {
      const res = await axios.post('clients/resend-confirmation-code', data);
      if (res.status === 200) {
        return true;
      }
      return false;
    } catch (error) {
      if (!error.response) {
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          error.response.data.error[0].msg,
        );
      }
    }
  };

  getPrincipalUserProfileData = async (clientId) => {
    try {
      const res = await axios.get(`clients/${clientId}`);
      return res.data;
    } catch (error) {
      if (!error.response) {
        console.log(error.response, 'auth error');
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          'ui-error-happened',
        );
      }
    }
  };

  getJustData = async () => {
    try {
      const res = await axios.get(``);
      console.log('getJustData:' + JSON.stringify(res));
      return res;
    } catch (error) {
      if (!error.response) {
        console.log(error.response, 'auth error');
        throw new ApiErrorException(
          ApiErrorTypes.CONNECTION_ERROR,
          'ui-networkConnectionError',
        );
      } else {
        throw new ApiErrorException(
          ApiErrorTypes.GENERAL_ERROR,
          'ui-error-happened',
        );
      }
    }
  };
}
